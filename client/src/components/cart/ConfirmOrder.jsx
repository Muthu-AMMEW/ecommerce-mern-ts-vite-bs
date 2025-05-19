import MetaData from '../layouts/MetaData';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutStep';
import { toast } from 'react-toastify';

export default function ConfirmOrder() {
    const { shippingInfo, cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const itemsPrice = cartItems.reduce((acc, item) => (acc + item.price * item.quantity), 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    let taxPrice = Number(0.05 * itemsPrice);
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2)

    const processPayment = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }


    useEffect(() => {
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
    }, [])

    return (
        <>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />
            {cartItems.length > 0 && shippingInfo && <>
                <div className="container-fluid p-3">
                    <div className="row">

                        <div className="col-12 col-lg-8">
                            <div className='ms-5'>
                                <h4 className="mb-3">Shipping Info</h4>
                                <div className="row">
                                    <div className="col-12 col-sm-5 col-md-4">
                                        <p><b>Name:</b> {user.fullName}</p>
                                        <p><b>Phone:</b> {shippingInfo.phoneNumber}</p>
                                    </div>
                                    <div className="col-12 col-sm text-start">
                                        <p className="mb-4"><b>Address:</b> {shippingInfo.fullName},<br />
                                            {shippingInfo.addressLine1},<br />
                                            {shippingInfo.addressLine2},<br />
                                            {shippingInfo.city}, {shippingInfo.state},<br />
                                            {shippingInfo.country},Pin Code: {shippingInfo.postalCode}.<br />
                                            Phone No.: {shippingInfo.phoneNumber} </p>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <h3 className="mt-5 text-center">Your Cart <b>{cartItems.length} items</b></h3>
                            {cartItems.map((item) =>
                            (<div key={item._id}>
                                <hr />
                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-6 col-lg-3 text-center">
                                            <Link className='text-black' to={"/product/" + item._id} ><img src={item.image} alt={item.name} height="90" width="115" /></Link>
                                        </div>

                                        <div className='col-6 col-lg-9'>
                                            <div className="row d-flex flex-column flex-lg-row justify-content-center align-items-center">
                                                <h6 className="col text-center m-2">
                                                    <Link className='text-black' to={"/product/" + item._id} >{item.name}</Link>
                                                </h6>

                                                <div className="col text-center m-3">
                                                    <p>{item.quantity} x Rs. {item.price} = <b>Rs. {item.quantity * item.price}</b></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>)
                            )}

                        </div>

                        <div className="col-12 col-lg-4 my-5 text-center">
                            <div className='border rounded-5 p-5'>
                                <h4>Order Summary</h4>
                                <hr />
                                <h6 className='m-4'>Subtotal:  <span className='text-danger'>Rs. {itemsPrice}</span></h6>
                                <h6 className='m-4'>Shipping: <span className='text-danger'>Rs. {shippingPrice}</span></h6>
                                <h6 className='m-4'>Tax: <span className='text-danger'>Rs. {taxPrice}</span></h6>

                                <hr />
                                <h6 className='m-4'>Total: <span className='text-danger'>Rs. {totalPrice}</span></h6>

                                <hr />
                                <button className="btn btn-primary btn-block" onClick={processPayment}>Proceed to Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>)
}