import { useElements, useStripe } from "@stripe/react-stripe-js"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
// import { validateShipping } from './Shipping';
import { createOrder } from '../../actions/orderActions'
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const { user } = useSelector(state => state.authState)
    const { cartItems, shippingInfo } = useSelector(state => state.cartState)
    const { error: orderError } = useSelector(state => state.orderState)

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

    }, [])



    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice

    }
    let paymentData;
    useEffect(() => {
        if (orderInfo) {
            paymentData = {
                amount: Math.round(orderInfo.totalPrice * 100),
                shipping: {
                    name: user.fullName,
                    address: {
                        city: shippingInfo.city,
                        postal_code: shippingInfo.postalCode,
                        country: shippingInfo.country,
                        state: shippingInfo.state,
                        line1: shippingInfo.address
                    },
                    phone: shippingInfo.phoneNumber
                }
            }
        }
    }, [orderInfo, shippingInfo, user])

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        try {
            const { data } = await axios.post('/api/v1/payment/process', paymentData)
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
                document.querySelector('#pay_btn').disabled = false;
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

                    navigate('/order/success')
                } else {
                    toast('Please Try again!', {
                        type: 'warning',
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                }
            }


        } catch (error) {

        }
    }


    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-4">Card Info</h1>
                    <div className="form-group">
                        <label htmlFor="card_num_field">Card Number</label>
                        <CardNumberElement
                            type="text"
                            id="card_num_field"
                            className="form-control"

                        />
                        <div className="form-text">4242 4242 4242 4242</div> //only for testing
                    </div>

                    <div className="form-group">
                        <label htmlFor="card_exp_field">Card Expiry</label>
                        <CardExpiryElement
                            type="text"
                            id="card_exp_field"
                            className="form-control"
                        />
                        <div className="form-text">12/34</div> //only for testing
                    </div>

                    <div className="form-group">
                        <label htmlFor="card_cvc_field">Card CVC</label>
                        <CardCvcElement
                            type="text"
                            id="card_cvc_field"
                            className="form-control"
                            value=""
                        />
                        <div className="form-text">143</div> //only for testing
                    </div>


                    <button
                        id="pay_btn"
                        type="submit"
                        className="btn btn-block py-3"
                    >
                        Pay - {` Rs. ${orderInfo && orderInfo.totalPrice}`}
                    </button>

                </form>
            </div>
        </div>
    )
}