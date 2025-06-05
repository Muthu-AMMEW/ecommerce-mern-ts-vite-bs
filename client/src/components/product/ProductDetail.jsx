import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions"
import Loader from '../layouts/Loader';
import { Carousel } from 'react-bootstrap';
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
import { Modal } from 'react-bootstrap';
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";

export default function ProductDetail() {
    const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { user } = useSelector(state => state.authState);
    const { cartItems } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    function increaseQty() {
        if (product.stock <= quantity) {
            return;
        }
        setQuantity((state) => state + 1);
    }

    function decreaseQty() {
        if (quantity > 1) {
            setQuantity((state) => state - 1);
        }
    }

    function addToCart() {
        const itemExist = cartItems.find((item) => item._id === product._id)
        if (!itemExist) {
            dispatch(addCartItem(product._id, quantity))
            toast('Cart Item added succesfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
        } else {
            toast('Already this product added. Please check or customise on Cart', {
                type: 'info',
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData))

    }

    useEffect(() => {
        if (isReviewSubmitted) {
            handleClose()
            toast('Review Submitted successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewSubmitted())
            })

        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            navigate('/home');
        }
        if (!product._id || isReviewSubmitted) {
            dispatch(getProduct(id))
        }

        return () => {
            dispatch(clearProduct())
        }


    }, [dispatch, id, isReviewSubmitted, error])



    return (
        <>
            {loading ? <Loader /> :
                <div className="m-2 m-sm-5 m-lg-2 m-xl-5">
                    <MetaData title={product.name} />
                    <div className="row">
                        <div className="col-12 col-lg-7 mt-lg-5 text-center">
                            <Carousel pause="hover">
                                {product.images && product.images.length > 0 && product.images.map(image =>
                                    <Carousel.Item key={image.filename}>
                                        <img className="d-block w-100 h-auto object-fit-contain rounded-5 bg-body-secondary" style={{ maxHeight: '600px' }}
                                            src={image.image} alt={product.name} />
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-3 text-center">
                            <h5>{product.name}</h5>
                            <p className=' fst-italic'>Product #{product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                            </div>
                            <span className="fw-bold fs-6"> ({Number(product.ratings).toFixed(1)} from {product.numOfReviews} Reviews)</span>

                            <hr />


                            <h5 className=' fw-bolder mb-3'>Rs. {product.price}</h5>
                            <div className="d-flex justify-content-evenly">
                                <span className="btn btn-danger" onClick={decreaseQty}>-</span>

                                <input className='form-control mm-box-color text-center w-25' type="number" name="quantity" value={quantity} readOnly />

                                <span className="btn btn-primary" onClick={increaseQty}>+</span>
                                <button type="button" onClick={addToCart} disabled={product.stock <= 0} className="btn btn-primary">Add to Cart</button>
                            </div>


                            <hr />

                            <p className='fw-bold'>Status <h5 className={product.stock > 0 ? 'text-success' : 'text-danger'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</h5></p>

                            <hr />

                            <h4 className="mt-2">Description</h4>
                            <p className="text-start" style={{ textIndent: '3em' }}>{product.description}</p>
                            <h6 className="card-text text-danger">Category: {product.category}</h6>
                            <hr />
                            <h6>Sold by: <strong>{product.seller}</strong></h6>
                            {user ?
                                <div className="text-center">
                                    <button onClick={handleShow} type="button" className="btn btn-warning mt-4" data-toggle="modal" data-target="#ratingModal">
                                        Submit Your Review
                                    </button></div> :
                                <div className="alert alert-danger mt-5"> Login to Post Review</div>
                            }

                        </div>

                        <div className="row">
                            <div className="rating w-50 my-0">
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Submit Review</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ul className="stars" >
                                            {
                                                [1, 2, 3, 4, 5].map((star, i) => (
                                                    <li key={i}
                                                        value={star}
                                                        onClick={() => setRating(star)}
                                                        className={`star ${star <= rating ? 'orange' : ''}`}
                                                        onMouseOver={(e) => e.target.classList.add('yellow')}
                                                        onMouseOut={(e) => e.target.classList.remove('yellow')}

                                                    ><i className="fa fa-star"></i></li>
                                                ))
                                            }
                                        </ul>

                                        <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                        </textarea>
                                        <button disabled={loading} onClick={reviewHandler} aria-label="Close" className="btn btn-warning my-3 float-right px-4 text-white">Submit</button>
                                    </Modal.Body>

                                </Modal>
                            </div>
                        </div>

                    </div>
                    {
                        product.reviews && product.reviews.length > 0 ?
                            <ProductReview reviews={product.reviews} /> : null
                    }

                </div>}
        </>
    )
}