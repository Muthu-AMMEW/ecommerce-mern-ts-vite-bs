import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { clearNewOrder } from "../../slices/orderSlice";
// import { validateShipping } from './Shipping';
import { createOrder, updateOrder } from '../../actions/orderActions'
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

    function activateGateway() {
        try {
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: newOrderDetail.totalPrice,
                currency: newOrderDetail.paymentInfo.currency,
                name: 'Easwaran',
                description: 'Test Transaction',
                order_id: newOrderDetail.paymentInfo.pgOrderId,
                // callback_url: '/order/success', // optional

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

                            dispatch(orderCompleted());
                            dispatch(clearNewOrder());
                            setLoading(false);
                            navigate('/order/success');
                        } else {
                            toast('Payment verification failed', {
                                type: 'error',
                                position: toast.POSITION.BOTTOM_CENTER
                            });
                            setLoading(false);
                        }
                    } catch (error) {
                        toast(error.message || 'Error verifying payment', {
                            type: 'error',
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                        setLoading(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        toast("You cancelled payment. Try again", {
                            type: "info",
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                        setLoading(false);
                    }
                }
            };
            const rzp = new Razorpay(options);
            rzp.on("payment.failed", function (response) {
                toast(response.error, {
                    type: 'error',
                    position: toast.POSITION.BOTTOM_CENTER
                });
                setLoading(false);
            });

            rzp.open();

        } catch (error) {
            toast(error.message, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER
            });
            setLoading(false);
        }
    }

    function cancelOrder() {
        if (newOrderDetail?._id) {
            let orderData = { orderStatus: "Cancelled" };
            dispatch(updateOrder(newOrderDetail?._id, orderData))
            toast.success("Order Status Updated")
        }
        dispatch(orderCompleted());
        dispatch(clearNewOrder());
        setLoading(false);
        toast.success("Order Cancelled")
        navigate('/home');
    }

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
            activateGateway();
        }
    }, [newOrderDetail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (newOrderDetail?.paymentInfo?.pgOrderId) {
            activateGateway();

        } else {
            dispatch(createOrder(order));
        }

    }

    return (
        <>
            <MetaData title={'Payment Gateway'} />
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row align-items-center justify-content-center mb-3">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-25">
                        <form className="w-100 mm-input-box-color" onSubmit={handleSubmit}>
                            <h1 className="mb-4">Copy Card Info</h1>

                            <div className="form-group">
                                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                <input type="text" className="form-control" id="cardNumber" name="cardNumber" value={"4718 6091 0820 4366"} readOnly />
                                <div className="form-text"><span className="badge text-bg-warning">Card Number for testing</span></div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-7">
                                    <div className="form-group">
                                        <label htmlFor="cardExpire" className="form-label">Card Expiry</label>
                                        <input type="text" className="form-control" id="cardExpire" name="cardExpire" value={"12/34"} readOnly />
                                        <div className="form-text"><span className="badge text-bg-warning">Expire Date for testing</span></div>
                                    </div>
                                </div>

                                <div className="col-5">
                                    <div className="form-group">
                                        <label htmlFor="cvv" className="form-label">Card CVC</label>
                                        <input type="text" className="form-control" id="cvv" name="cvv" value={143} readOnly />
                                        <div className="form-text"><span className="badge text-bg-warning">CVV for testing</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group w-50 mt-2">
                                <label htmlFor="otp" className="form-label">OTP</label>
                                <input type="text" className="form-control" id="otp" name="otp" value={807249} readOnly />
                                <div className="form-text"><span className="badge text-bg-warning">OTP for testing</span></div>
                            </div>
                            <p className="m-2">The Card Number is Main*. You can use others in the format you like. Copy all details for testing in the gateway. Or simply use UPI apps</p>
                            <div className="mt-3 text-center">
                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                        </div>
                                    </div>) : null
                                }

                                <button className="btn btn-success m-1" type="submit" disabled={loading}>Pay - {formatRupees(orderInfo && orderInfo.totalPrice)}</button>
                                <button className="btn btn-danger m-1" type="button" onClick={cancelOrder} disabled={loading}>Cancel Order</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}