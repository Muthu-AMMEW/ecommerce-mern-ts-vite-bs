import { useEffect, useState } from "react";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useAppDispatch, useAppSelector } from "../hooks";

export default function Home() {
    const dispatch = useAppDispatch();
    const { products, loading, error, productsCount, resPerPage } = useAppSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (pageNo: number) => {
        setCurrentPage(pageNo)
    }

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center' })
            return
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
            {loading ? <Loader /> : products?.length === 0 ? <div className="text-center h2" style={{ paddingTop: '200px', paddingBottom: "200px" }}>Not Found</div> :
                <>
                    <MetaData title={'Buy Best Products'} />
                    {/* <h3 className="ps-5 pt-3 text-decoration-underline">Latest Products</h3> */}
                    <section id="products" className="container mt-3">
                        <div className="row">
                            {products && products.map((product: any) => (
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