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
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/payment/process`, paymentData)
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
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg">
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement type="text" id="card_num_field" className="form-control" />
                            <div className="form-text">4242 4242 4242 4242</div> //only for testing
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement type="text" id="card_exp_field" className="form-control" />
                            <div className="form-text">12/34</div> //only for testing
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement type="text" id="card_cvc_field" className="form-control" />
                            <div className="form-text">143</div> //only for testing
                        </div>

                        <div className="mt-3 text-center">
                            {loading ?
                                (<div className="text-center">
                                    <div className="spinner-border text-primary " role="status">
                                    </div>
                                </div>) : null
                            }

                            <button className="btn btn-primary me-5" type="submit" disabled={loading}>Pay - {` Rs. ${orderInfo && orderInfo.totalPrice}`}</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}