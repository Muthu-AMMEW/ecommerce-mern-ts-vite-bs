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
import { TaskAbortError } from "@reduxjs/toolkit";

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

	function search() {
		if (!isNaN(price[0] || !isNaN(price[1]))) {
			if (Number(price[0]) < Number(price[1])) {
				setPriceChanged(price);
			} else {
				toast.warning("Please enter correct minimum and maximum value", { position: 'top-center' })
			}
		} else {
			toast.warning("Please enter valid numbers", { position: 'top-center' })
		}
	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === "Tab") {
			search();
		}
	};

	const handleChange = async (event) => {

		if (event.target.name === 'min') {
			const min = [...priceChanged];
			min[0] = event.target.value;
			setPrice(min)
		}
		if (event.target.name === 'max') {
			const max = [...priceChanged];
			max[1] = event.target.value;
			setPrice(max)
		}
	};

	const setCurrentPageNo = (pageNo) => {

		setCurrentPage(pageNo)

	}

	useEffect(() => {
		if (error) {
			return toast.error(error, { position: 'top-center' })
		}
		dispatch(getProducts(keyword, priceChanged, category, rating, currentPage))
	}, [error, dispatch, currentPage, keyword, priceChanged, category, rating])


	return (
		<>
			{loading ? <Loader /> :
				<>
					<MetaData title={keyword} />

					<section id="products" className="container mt-3">
						<div className="border border-black rounded-5 border-5 border-opacity-25">
							{/* <div className="h3 text-center text-decoration-underline">Filters</div> */}
							{/* Price Filter */}

							<div className="px-5 m-3" onMouseUp={search}>
								<Slider
									range={true}
									marks={
										{
											[priceChanged[0]]: <span className="text-black">Rs. <input type="search" className="border-info mm-box-color" style={{ width: "5rem" }} id="min" name="min" value={price[0]} onChange={handleChange} onClick={(e) => e.target.value = ""} onKeyDown={handleKeyDown} placeholder="Min" /></span>,
											[priceChanged[1]]: <span className="text-black text-nowrap">Rs. <input type="search" className="border-info mm-box-color" style={{ width: "5rem" }} id="max" name="max" value={price[1]} onChange={handleChange} onClick={(e) => e.target.value = ""} onKeyDown={handleKeyDown} placeholder="Max" /></span>
										}
									}
									min={Number(priceChanged[0])}
									max={Number(priceChanged[1])}
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
							</div>
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

						{
							products?.length === 0 ? <div className="text-center h2" style={{ paddingTop: '100px', paddingBottom: "100px" }}>Not Found</div> :
								<div className="row">
									{products && products.map(product => (
										<Product key={product._id} product={product} />
									))}
								</div>
						}
					</section>
					{productsCount > 0 && productsCount > resPerPage ?
						<div className="d-flex justify-content-center mt-5">
							<Pagination
								activePage={currentPage}
								onChange={setCurrentPageNo}
								totalItemsCount={productsCount}
								itemsCountPerPage={resPerPage}
								prevPageText={'Previous'}
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