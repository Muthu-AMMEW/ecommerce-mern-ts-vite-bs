import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice';

export default function Cart() {
    const { cartItems } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increaseQty = (item) => {
        if (item.quantity >= item.stock) {
            return;
        }
        dispatch(increaseCartItemQty(item._id))
    }
    const decreaseQty = (item) => {
        const count = item.quantity;
        if (count > 1) {
            dispatch(decreaseCartItemQty(item._id))
        }

    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }


    return (
        cartItems.length > 0 ? <>
            <div className="container-fluid p-3">
                <div className="row">
                    <h2 className="mt-5 text-center">Your Cart: <b>{cartItems.length} items</b></h2>
                    <div className="col-12 col-lg-9">
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

                                            <div className="col text-center m-2">
                                                <h5>Rs. {item.price}</h5>
                                            </div>

                                            <div className="col text-center m-2">
                                                <div className="d-flex justify-content-evenly">
                                                    <span className="btn btn-danger" onClick={() => decreaseQty(item)}>-</span>
                                                    <input type="number" className="text-center border border-0" style={{ width: "3rem"}} name="quantity" value={item.quantity} readOnly />

                                                    <span className="btn btn-primary" onClick={() => increaseQty(item)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col text-center m-3">
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
                            <h6 className='m-4'>Subtotal:  <span className='text-danger'>{cartItems.reduce((acc, item) => (acc + item.quantity), 0)} (Units)</span></h6>
                            <h6 className='m-4'>Est. total: <span className='text-danger'>Rs. {Number(cartItems.reduce((acc, item) => (acc + item.quantity * item.price), 0)).toFixed(2)}</span></h6>

                            <hr />
                            <button onClick={checkoutHandler} className="btn btn-success">Check out</button>
                        </div>
                    </div>
                </div>
            </div>
        </> : <h2 className='m-5 p-5 text-center'>Your Cart is Empty!</h2>
    )
}