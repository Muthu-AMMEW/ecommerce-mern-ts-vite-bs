import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from '../layouts/Loader';
import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import MetaData from "../layouts/MetaData";

export default function UpdateOrder() {


    const { loading, isOrderUpdated, error, orderDetail } = useSelector(state => state.orderState)
    const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {} } = orderDetail;
    const isPaid = paymentInfo.status === 'succeeded' ? true : false;
    const [orderStatus, setOrderStatus] = useState("Processing");
    const { id: orderId } = useParams();


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderData = {};
        orderData.orderStatus = orderStatus;
        dispatch(updateOrder(orderId, orderData))
    }

    useEffect(() => {
        if (isOrderUpdated) {
            toast('Order Updated Succesfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderUpdated())
            })

            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }

        dispatch(orderDetailAction(orderId))
    }, [isOrderUpdated, error, dispatch])


    useEffect(() => {
        if (orderDetail._id) {
            setOrderStatus(orderDetail.orderStatus);
        }
    }, [orderDetail])


    return (<>

        <Sidebar />
        {loading ? <Loader /> :
        <>
            <MetaData />
            <div className="container-fluid p-2">
                <div className='m-lg-5'>
                    <div className='m-lg-5'>
                        <div className='m-sm-5 border border-5 p-3'>
                            <h4 className='text-center text-decoration-underline m-1'>Order ID #{orderDetail._id}</h4>
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <div className="my-1"><span className='fw-bold'>Order Status : </span ><b className={orderStatus && orderStatus.includes('Delivered') ? 'success' : 'danger'}>{orderStatus}</b></div>
                                    <div className="my-1"><span className='fw-bold'>Name : </span>{user.fullName}</div>
                                    <div className="my-1"><span className='fw-bold'>ShippingInfo : </span><div className='ps-5'> 
                                        {shippingInfo.fullName},<br />
                                        {shippingInfo.addressLine1},<br />
                                        {shippingInfo.addressLine2},<br />
                                        {shippingInfo.city}, {shippingInfo.state},<br />
                                        {shippingInfo.country}, Postal Code: {shippingInfo.postalCode}.
                                    </div></div>
                                    <div className="my-1"><span className='fw-bold'>Phone Number : </span>{shippingInfo.phoneNumber}</div>
                                    <div className="my-1"><span className='fw-bold'>Email Address : </span>{user.email}</div>
                                    <div className="my-1"><span className='fw-bold'>Date : </span>{orderDetail.createdAt}</div>
                                    <div className="my-1"><span className='fw-bold'>Total Amount : </span>Rs. {totalPrice}</div>
                                    <div className="my-1"><span className='fw-bold'>Transaction ID : </span>{paymentInfo.id}</div>
                                    <div className="my-1"><span className='fw-bold'>Payment Status : </span>{isPaid ? 'PAID' : 'NOT PAID'}</div>

                                </div>
                                <div className="col-12 col-lg-6">
                                    <form onSubmit={handleSubmit} className='d-flex flex-column'>
                                        <label htmlFor="orderStatus" className='fw-bold'>Update Order Status</label>
                                        <select name="orderStatus" id="orderStatus" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className='form-select my-2'>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                        <button type='submit' className='btn btn-primary my-2' disabled={loading}>Update Order</button>
                                    </form>
                                </div>

                            </div>

                            <h5 className='text-center text-decoration-underline m-1'>Order Items</h5>
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
                                    <>
                                        <hr />
                                        <div className="cart-item">
                                            <div className="row">
                                                <div className="col-6 col-lg-3 text-center">
                                                    <Link className='text-black' to={"/product/" + item._id} >
                                                    <img src={item.image} alt={item.name} height="130" width="130" />
                                                    </Link>
                                                </div>

                                                <div className='col-6 col-lg-9'>
                                                    <div className="row d-flex flex-column flex-lg-row justify-content-center align-items-center">
                                                        <h6 className="col text-center m-2">
                                                            <Link className='text-black' to={"/product/" + item._id} >{item.name}</Link>
                                                        </h6>

                                                        <div className="col text-center m-2">
                                                            <h5>Rs. {item.price}</h5>
                                                        </div>

                                                        <div className="col text-center m-2">
                                                            <h6>{item.quantity} Piece(s)</h6>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                ))}

                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>


        </>}
    </>

    )
}