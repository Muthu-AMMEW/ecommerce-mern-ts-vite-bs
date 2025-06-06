import { useEffect, useState } from "react";
import AdminBar from "./AdminBar";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import Loader from '../layouts/Loader';
import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import MetaData from "../layouts/MetaData";
import { formatRupees } from "../../utils/formatRupees";
import { istDateTime } from "../../utils/istDateTime";

export default function UpdateOrder() {


	const { loading, isOrderUpdated, error, orderDetail } = useSelector(state => state.orderState)
	const { user = {}, orderItems = [], shippingInfo = {}, itemsPrice, taxPrice, shippingPrice, totalPrice = 0, paymentInfo = {}, deliveredAt } = orderDetail;
	const isPaid = paymentInfo.status === 'succeeded' ? true : false;
	const [orderStatus, setOrderStatus] = useState("Processing");
	const { id: orderId } = useParams();

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
	}, [isOrderUpdated, orderId, error, dispatch])


	useEffect(() => {
		if (orderDetail._id) {
			setOrderStatus(orderDetail.orderStatus);
		}
	}, [orderDetail])


	return (
		<>

			<AdminBar />
			{loading ? <Loader /> :
				<>
					<MetaData title={'Update Order'} />
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
											<div className="my-1"><span className='fw-bold'>Order Date : </span>{istDateTime(orderDetail.createdAt)}</div>
											<div className="my-1"><span className='fw-bold'>Items Price : </span>{formatRupees(itemsPrice)}</div>
											<div className="my-1"><span className='fw-bold'>Tax (GST) : </span>{formatRupees(taxPrice)}</div>
											<div className="my-1"><span className='fw-bold'>Shipping Charges : </span>{formatRupees(shippingPrice)}</div>
											<div className="my-1"><span className='fw-bold'>Total Amount : </span>{formatRupees(totalPrice)}</div>
											<div className="my-1"><span className='fw-bold'>Transaction ID : </span>{paymentInfo.id}</div>
											<div className="my-1"><span className='fw-bold'>Payment Status : </span>{isPaid ? 'PAID' : 'NOT PAID'}</div>
											{deliveredAt && <div className="my-1"><span className='fw-bold'>Deliverd Date : </span>{istDateTime(deliveredAt)}</div>}

										</div>
										<div className="col-12 col-lg-6 px-md-5 px-lg-2 mt-md-2">
											<form onSubmit={handleSubmit} className='d-flex flex-column px-md-5 px-lg-0 mm-input-box-color'>
												<label htmlFor="orderStatus" className='fw-bold'>Update Order Status</label>
												<select name="orderStatus" id="orderStatus" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className='form-select my-2'>
													<option value="Processing">Processing</option>
													<option value="Shipped">Shipped</option>
													<option value="Delivered">Delivered</option>
													<option value="Cancelled">Cancelled</option>
												</select>
												<button type='submit' className='btn btn-success my-1' disabled={loading}>Update Order</button>
											</form>
										</div>

									</div>

									<h5 className='text-center text-decoration-underline m-2'>Order Items</h5>
									<div className="cart-item my-1">
										{orderItems && orderItems.map((item, i) => (
											<div key={i}>
												<hr />
												<div className="cart-item">
													<div className="row">
														<div className="col-12 col-sm-4 col-lg-3 p-2 text-center">
															<Link className='text-black' to={"/product/" + item._id} >
																<img src={item.image} alt={item.name} height="130" width="130" />
															</Link>
														</div>

														<div className='col-12 col-sm-8 col-lg-9'>
															<div className="row justify-content-center align-items-center">
																<h6 className="col-12 col-lg-7 text-center">
																	<Link className='text-black text-decoration-none' to={"/product/" + item._id} >{item.name}</Link>
																</h6>

																<div className="col-6 col-lg-3 mt-3 text-center">
																	<h5>{formatRupees(item.price)}</h5>
																</div>

																<div className="col-6 col-lg-2 mt-3 text-center">
																	<h6>{item.quantity} Piece(s)</h6>
																</div>
															</div>
														</div>

													</div>
												</div>
											</div>
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