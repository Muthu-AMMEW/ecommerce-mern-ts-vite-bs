import { Link } from 'react-router-dom';

export default function Product({ product }) {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3`}>
            <div className="card p-3 rounded bg-body-tertiary">
                {product.images.length > 0 &&
                    <Link to={`/product/${product._id}`}><img
                        className="card-img-top mx-auto mm-card-img-size"
                        src={product.images[0].image}
                        alt={product.name} /></Link>}
                <div className="card-body d-flex flex-column">
                    <h6 className="card-title fw-bolder">
                        <Link className='text-decoration-none' to={`/product/${product._id}`}>{product.name}</Link>
                    </h6>

                    <div className="text-truncate my-1" style={{ maxWidth: '100%' }}>
                        {product.description}
                    </div>

                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                    </div>
                    <p className="card-text mt-1">Rs. {product.price}</p>
                    <p className="card-text text-danger">{product.category}</p>
                    <Link to={`/product/${product._id}`} className="btn btn-block btn-warning">View Details</Link>
                </div>
            </div>
        </div>
    )
}