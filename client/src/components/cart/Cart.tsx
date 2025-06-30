import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice';
import { formatRupees } from '../../utils/formatRupees';
import MetaData from '../layouts/MetaData';
import { useAppSelector } from '../../hooks';

export default function Cart() {
    const { cartItems } = useAppSelector(state => state.cartState)
    const { isAuthenticated } = useAppSelector(state => state.authState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increaseQty = (item: any) => {
        if (item.quantity >= item.stock) {
            return;
        }
        dispatch(increaseCartItemQty(item._id))
    }
    const decreaseQty = (item: any) => {
        const count = item.quantity;
        if (count > 1) {
            dispatch(decreaseCartItemQty(item._id))
        }

    }

    const checkoutHandler = () => {
        if (isAuthenticated) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=shipping')
        }
    }


    return (
        <>
            <MetaData title={'Cart'} />
            {cartItems.length > 0 ?
                <div className="container-fluid p-3">
                    <div className="row">
                        <h2 className="mt-5 text-center">Your Cart: <b>{cartItems.length} items</b></h2>
                        <div className="col-12 col-lg-9">
                            {cartItems.map((item: any) =>
                            (<div key={item._id}>
                                <hr />
                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-6 col-sm-4 col-md-3 text-center">
                                            <Link to={"/product/" + item._id} ><img src={item.image} className='rounded-1' alt={item.name} height="90" width="115" /></Link>
                                        </div>

                                        <div className='col-6 col-sm-8 col-md-9'>
                                            <div className="row d-flex flex-column flex-sm-row justify-content-center align-items-center">
                                                <h6 className="col-12 col-md-12 col-lg-5 text-center">
                                                    <Link className='text-black text-decoration-none' to={"/product/" + item._id}>{item.name}</Link>
                                                </h6>

                                                <div className="col-12 col-sm-4 col-md-3 col-lg-3 text-center">
                                                    <h6>{formatRupees(item.price)}</h6>
                                                </div>

                                                <div className="col-12 col-sm-6 col-md-3 col-lg-3 my-3 my-lg-0 text-center">
                                                    <div className="d-flex justify-content-center">
                                                        <span className="btn btn-danger" onClick={() => decreaseQty(item)}>-</span>
                                                        <input type="text" className="text-center mm-box-color border border-0 rounded-3 mx-1" style={{ width: "3rem" }} name="quantity" value={item.quantity} readOnly />

                                                        <span className="btn btn-primary" onClick={() => increaseQty(item)}>+</span>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-2 col-md-3 col-lg-1 text-center">
                                                    <span onClick={() => dispatch(removeItemFromCart(item._id))}><i className="fa fa-trash btn btn-danger"></i></span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>)
                            )}

                        </div>

                        <div className="col-12 col-lg-3 my-lg-5 text-center">
                            <div className='border rounded-5 p-5'>
                                <h4>Order Summary</h4>
                                <hr />
                                <h6 className='m-4'>Total:  <span className='badge text-bg-warning'>{cartItems.reduce((acc: number, item: any) => (acc + item.quantity), 0)} (Items)</span></h6>
                                <h6 className='m-4'>Est. Amount: <span className='badge text-bg-warning'>{formatRupees(cartItems.reduce((acc: number, item: any) => (acc + item.quantity * item.price), 0))}</span></h6>

                                <hr />
                                <button onClick={checkoutHandler} className="btn btn-success">Check out</button>
                            </div>
                        </div>
                    </div>
                </div> : <h2 className='m-5 p-5 text-center'>Your Cart is Empty!</h2>
            }
        </>
    )
}