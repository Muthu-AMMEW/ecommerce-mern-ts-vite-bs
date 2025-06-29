import { useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteProduct, getAdminProducts } from "../../actions/productActions"
import { clearProductError, clearIsProductDeleted } from "../../slices/productSlice"
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify'
import AdminBar from "./AdminBar"
import MetaData from "../layouts/MetaData"
import { formatRupees } from "../../utils/formatRupees"

export default function ProductList() {
    const { products = [], loading = true, error } = useSelector(state => state.productsState)
    const { isProductDeleted, error: productError } = useSelector(state => state.productState)
    const dispatch = useDispatch();
    let sno = 0;

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'S.No ↕',
                    field: 'sno',
                    sort: 'asc'
                },
                {
                    label: 'ID ↕',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name ↕',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price ↕',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Category ↕',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Seller ↕',
                    field: 'seller',
                    sort: 'asc'
                },
                {
                    label: 'Stock ↕',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions ↕',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                sno: ++sno,
                id: <Link to={`/product/${product._id}`} className="text-primary">{product._id}</Link>,
                name: product.name,
                price: formatRupees(product.price),
                category: product.category,
                seller: product.seller,
                stock: product.stock,
                actions: (
                    <div className="text-nowrap">
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, product._id)} className="btn btn-danger ms-1">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                )
            })
        })

        return data;
    }

    const deleteHandler = async (e, id) => {
        e.target.disabled = true;
        // await new Promise(resolve => setTimeout(resolve, 5000));
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if (error || productError) {
            toast.error(error || productError, {
                position: 'top-center',
                onOpen: () => dispatch(clearProductError())
            })
            return
        }
        if (isProductDeleted) {
            toast.success('Product Deleted Succesfully!', {
                position: 'top-center',
                onOpen: () => dispatch(clearIsProductDeleted())
            })
            return;
        }

        dispatch(getAdminProducts)
    }, [dispatch, error, productError, isProductDeleted])


    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={'Product List'} />
                    <AdminBar />
                    <div className="p-4">
                        <h1 className="my-1 ps-2">Product List</h1>
                        {loading ? <Loader /> :
                            <div className="table-responsive">
                                <MDBDataTable
                                    data={setProducts()}
                                    bordered
                                    striped
                                    hover
                                    className="px-3"
                                />
                            </div>
                        }
                    </div>
                </>
            }
        </>
    )
}