import { useElements, useStripe } from "@stripe/react-stripe-js"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
// import { validateShipping } from './Shipping';
import { createOrder } from '../../actions/orderActions'
import { clearError as clearOrderError } from "../../slices/orderSlice";
import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutStep";

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const { user } = useSelector(state => state.authState)
    const { cartItems, shippingInfo } = useSelector(state => state.cartState)
    const { error: orderError } = useSelector(state => state.orderState)
    const [loading, setloading] = useState(false)

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

    let order, paymentData;
    useEffect(() => {
        if (orderInfo) {
            order = {
                orderItems: cartItems,
                shippingInfo,
                itemsPrice: orderInfo.itemsPrice,
                shippingPrice: orderInfo.shippingPrice,
                taxPrice: orderInfo.taxPrice,
                totalPrice: orderInfo.totalPrice
            }
            paymentData = {
                amount: Math.round(orderInfo.totalPrice * 100),
                shipping: {
                    name: shippingInfo.fullName,
                    address: {
                        line1: shippingInfo.addressLine1,
                        line2: shippingInfo.addressLine2,
                        city: shippingInfo.city,
                        state: shippingInfo.state,
                        country: shippingInfo.country,
                        postal_code: shippingInfo.postalCode
                    },
                    phone: shippingInfo.phoneNumber
                }
            }
        }

    }, [orderInfo])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const { data } = await axios.post(`/payment/process`, paymentData)
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.fullName,
                        email: user.email
                    }
                }
            })

            if (result.error) {
                toast(result.error.message, {
                    type: 'error',
                    position: toast.POSITION.BOTTOM_CENTER
                })
                setloading(false);
            } else {
                if ((await result).paymentIntent.status === 'succeeded') {
                    toast('Payment Success!', {
                        type: 'success',
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(orderCompleted())
                    dispatch(createOrder(order))
                    setloading(false);
                    navigate('/order/success')
                } else {
                    toast('Please Try again!', {
                        type: 'warning',
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    setloading(false);
                }
            }


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
                                <CardNumberElement type="text" id="cardNumber" className="form-control mm-box-color" required />
                                <div className="form-text">4242 4242 4242 4242 <span className="badge text-bg-warning">Card Number for testing</span></div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-7">
                                    <div className="form-group">
                                        <label htmlFor="cardExpire" className="form-label">Card Expiry</label>
                                        <CardExpiryElement type="text" id="cardExpire" className="form-control mm-box-color" required />
                                        <div className="form-text">12/34 <span className="badge text-bg-warning">Expire Date for testing</span></div>
                                    </div>
                                </div>

                                <div className="col-5">
                                    <div className="form-group">
                                        <label htmlFor="cvv" className="form-label">Card CVC</label>
                                        <CardCvcElement type="text" id="cvv" className="form-control mm-box-color" required />
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

                                <button className="btn btn-success me-5" type="submit" disabled={loading}>Pay - {` Rs. ${orderInfo && orderInfo.totalPrice}`}</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}