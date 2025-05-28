import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteReview, getReviews } from "../../actions/productActions"
import { clearError, clearReviewDeleted } from "../../slices/productSlice"
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify'
import Sidebar from "./Sidebar"
import MetaData from "../layouts/MetaData"

export default function ReviewList() {
    const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(state => state.productState)
    const [productId, setProductId] = useState("");
    const dispatch = useDispatch();

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                user: review.user.fullName,
                comment: review.comment,
                actions: (
                    <>
                        <Button onClick={e => deleteHandler(e, review._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteReview(productId, id))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getReviews(productId))
    }

    useEffect(() => {
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
        if (isReviewDeleted) {
            toast('Review Deleted Succesfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewDeleted())
            })
            dispatch(getReviews(productId))
            return;
        }


    }, [dispatch, error, productId, isReviewDeleted])


    return (
        <>
            <MetaData title={'Review List'} />
            <Sidebar />
            <div className="p-4">
                <h1 className="my-1 ps-2">Review List</h1>
                <div className="row justify-content-center mt-5">
                    <div className="col-5">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="productId" >Product ID</label>
                                <input type="text" className="form-control" id="productId" name="productId" value={productId} onChange={e => setProductId(e.target.value)} required />
                            </div>
                            <div className="text-center"><button type="submit" disabled={loading} className="btn btn-primary btn-block my-2">
                                Search
                            </button></div>
                        </form>
                    </div>
                </div>
                {loading ? <Loader /> :
                    <div className="table-responsive">
                        <MDBDataTable
                            data={setReviews()}
                            bordered
                            striped
                            hover
                            className="px-3"
                        />
                    </div>
                }
            </div>
        </>
    )
}