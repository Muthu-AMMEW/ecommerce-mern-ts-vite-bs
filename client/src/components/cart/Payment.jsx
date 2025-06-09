import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { clearNewOrder } from "../../slices/orderSlice";
// import { validateShipping } from './Shipping';
import { createOrder } from '../../actions/orderActions'
import { clearError as clearOrderError } from "../../slices/orderSlice";
import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutStep";
import { formatRupees } from "../../utils/formatRupees";

export default function Payment() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const { user } = useSelector(state => state.authState)
    const { cartItems, shippingInfo } = useSelector(state => state.cartState)
    const { error: orderError, newOrderDetail } = useSelector(state => state.orderState)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!orderInfo) {
            toast('Please Conform Order Price', {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER
            })
            navigate('/order/confirm');
            return;
        }

        if (!shippingInfo.fullName ||
            !shippingInfo.addressLine1 ||
            !shippingInfo.addressLine2 ||
            !shippingInfo.city ||
            !shippingInfo.state ||
            !shippingInfo.country ||
            !shippingInfo.postalCode ||
            !shippingInfo.phoneNumber) {

            toast('Please fill all the fields in shipping info', {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER
            })
            navigate('/shipping');
        }
        if (orderError) {
            toast(orderError, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearOrderError()) }
            })
        }

    }, [orderError])

    let order;
    useEffect(() => {
        if (orderInfo) {
            order = {
                orderItems: cartItems,
                shippingInfo,
                itemsPrice: orderInfo.itemsPrice,
                shippingPrice: orderInfo.shippingPrice,
                taxPrice: orderInfo.taxPrice,
                totalPrice: orderInfo.totalPrice,
                paymentInfo: {
                    payerName: user.fullName,
                    payerEmailId: user.email,
                    payerPhoneNumber: user.phoneNumber,
                    currency: "INR"
                },
            }

        }

    }, [orderInfo])

    useEffect(() => {
        if (newOrderDetail?.paymentInfo?.pgOrderId) {
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // 🔁 Replace with your real key
                amount: newOrderDetail.totalPrice,
                currency: newOrderDetail.paymentInfo.currency,
                name: 'Easwaran',
                description: 'Test Transaction',
                order_id: newOrderDetail.paymentInfo.pgOrderId,
                callback_url: '/order/success', // optional

                // Optional: Pre-filled user details
                prefill: {
                    name: user.fullName,
                    email: user.email,
                    contact: user.phoneNumber
                },
                theme: {
                    color: '#F37254'
                },
                handler: async function (response) {
                    // Step 3: Verify payment signature
                    try {
                        const { data } = await axios.post('/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (data.status === 'ok') {
                            toast('Payment Success!', {
                                type: 'success',
                                position: toast.POSITION.BOTTOM_CENTER
                            });

                            order.paymentInfo = {
                                id: response.razorpay_payment_id,
                                status: 'succeeded' // Razorpay does not give a paymentIntent, so adapt as per your backend
                            };

                            dispatch(orderCompleted());
                            dispatch(clearNewOrder());
                            setLoading(false);
                            navigate('/order/success');
                        } else {
                            alert('Payment verification failed');
                            setLoading(false);
                        }
                    } catch (error) {
                        toast(error.message || 'Error verifying payment', {
                            type: 'warning',
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                        setLoading(false);
                    }
                }
            };
            const rzp = new Razorpay(options);
            rzp.open();

        }
    }, [newOrderDetail]); // 👈 this is key



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            dispatch(createOrder(order));

        } catch (error) {
            console.log(error)

        }
    }


    return (
        <>
            <MetaData title={'Payment Gateway'} />
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row align-items-center justify-content-center mb-3">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-25">
                        <form className="w-100" onSubmit={handleSubmit}>
                            <h1 className="mb-4">Card Info</h1>
                            <div className="form-group">
                                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                <input type="text" id="cardNumber" className="form-control mm-box-color" />
                                <div className="form-text">4718 6091 0820 4366<span className="badge text-bg-warning">Card Number for testing</span></div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-7">
                                    <div className="form-group">
                                        <label htmlFor="cardExpire" className="form-label">Card Expiry</label>
                                        <input type="text" id="cardExpire" className="form-control mm-box-color" />
                                        <div className="form-text">12/34 <span className="badge text-bg-warning">Expire Date for testing</span></div>
                                    </div>
                                </div>

                                <div className="col-5">
                                    <div className="form-group">
                                        <label htmlFor="cvv" className="form-label">Card CVC</label>
                                        <input type="text" id="cvv" className="form-control mm-box-color" />
                                        <div className="form-text">143 <span className="badge text-bg-warning">CVV for testing</span></div>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-3 text-center">
                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                        </div>
                                    </div>) : null
                                }

                                <button className="btn btn-success me-5" type="submit" disabled={loading}>Pay - {formatRupees(orderInfo && orderInfo.totalPrice)}</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}