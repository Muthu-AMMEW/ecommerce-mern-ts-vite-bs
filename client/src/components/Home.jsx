import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts(null, null, null, null, currentPage))
    }, [error, dispatch, currentPage])

    useEffect(() => {
        // Try scrolling the document itself
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE
        document.body.scrollTop = 0;             // For Safari
    }, [currentPage]);

    return (
        <>
            {loading ? <Loader /> : products.length === 0 ? <div className="text-center h2" style={{paddingTop: '200px', paddingBottom:"200px"}}>Not Found</div> :
                <>
                    <MetaData title={'Buy Best Products'} />
                    {/* <h3 className="ps-5 pt-3 text-decoration-underline">Latest Products</h3> */}
                    <section id="products" className="container mt-3">
                        <div className="row">
                            {products && products.map(product => (
                                <Product key={product._id} product={product} />
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