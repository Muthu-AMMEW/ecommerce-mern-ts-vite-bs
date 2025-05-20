import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import Product from "./Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

export default function ProductSearch() {
	const dispatch = useDispatch();
	const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
	const [currentPage, setCurrentPage] = useState(1);
	const [price, setPrice] = useState([1, 100000]);
	const [priceChanged, setPriceChanged] = useState(price);
	const [category, setCategory] = useState(null);
	const [rating, setRating] = useState(0);

	const { keyword } = useParams();
	const categories = [
		'Electronics',
		'Mobile Phones',
		'Laptops',
		'Accessories',
		'Headphones',
		'Food',
		'Books',
		'Clothes/Shoes',
		'Beauty/Health',
		'Sports',
		'Outdoor',
		'Home'
	];

	const setCurrentPageNo = (pageNo) => {

		setCurrentPage(pageNo)

	}

	useEffect(() => {
		if (error) {
			return toast.error(error, {
				position: toast.POSITION.BOTTOM_CENTER
			})
		}
		dispatch(getProducts(keyword, priceChanged, category, rating, currentPage))
	}, [error, dispatch, currentPage, keyword, priceChanged, category, rating])


	return (
		<>
			{loading ? <Loader /> :
				<>
					<MetaData title={'Buy Best Products'} />
					<section id="products" className="container mt-3">
						<div className="border border-black rounded-5 border-5 border-opacity-25">
							{/* <div className="h3 text-center text-decoration-underline">Filters</div> */}
							{/* Price Filter */}

							<div className="px-5 m-3" onMouseUp={() => setPriceChanged(price)}>
								<Slider
									range={true}
									marks={
										{
											1: "Rs.1",
											100000: "Rs.100000"
										}
									}
									min={1}
									max={100000}
									defaultValue={price}
									onChange={(price) => {
										setPrice(price)
									}}
									handleRender={
										renderProps => {
											return (
												<Tooltip overlay={`Rs. ${renderProps.props['aria-valuenow']}`}  >
													<div {...renderProps.props}>  </div>
												</Tooltip>
											)
										}
									}
								/>
								<div className="row">
									<div className="col-6 text-center my-4">
										{/* Category Filter */}
										<div className="btn-group dropdown">
											<button className="btn btn-lg btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
												Categories
											</button>
											<button type="button" className="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
												<span className="visually-hidden">Toggle Dropdown</span>
											</button>
											<ul className="dropdown-menu">
												{categories.map(category =>
													<li className="dropdown-item " key={category} onClick={() => {
														setCategory(category)
													}}>{category}</li>
												)}

											</ul>
										</div>
									</div>
									<div className="col-6 text-center my-4">
										{/* Ratings Filter */}
										<div className="btn-group dropdown">
											<button className="btn btn-lg btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
												Ratings
											</button>
											<button type="button" className="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
												<span className="visually-hidden">Toggle Dropdown</span>
											</button>
											<ul className="dropdown-menu">
												{[5, 4, 3, 2, 1].map(star =>
													<li className="dropdown-item " key={star} onClick={() => {
														setRating(star)
													}}>{star}</li>
												)}

											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>



						<div className="row">
							{products && products.map(product => (
								<Product col={3} key={product._id} product={product} />
							))}
						</div>

					</section>
					{productsCount > 0 && productsCount > resPerPage ?
						<div className="d-flex justify-content-center mt-5">
							<Pagination
								activePage={currentPage}
								onChange={setCurrentPageNo}
								totalItemsCount={productsCount}
								itemsCountPerPage={resPerPage}
								nextPageText={'Next'}
								firstPageText={'First'}
								lastPageText={'Last'}
								itemClass={'page-item'}
								linkClass={'page-link'}
							/>
						</div> : null}
				</>
			}
		</>
	)
}