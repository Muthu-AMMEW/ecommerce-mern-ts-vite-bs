import { useEffect } from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { deleteOrder, adminOrders as adminOrdersAction } from "../../actions/orderActions"
import { clearOrderError, clearIsOrderDeleted } from "../../slices/orderSlice"
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify'
import AdminBar from "./AdminBar"
import MetaData from "../layouts/MetaData"
import { formatRupees } from "../../utils/formatRupees"
import { istDateTime } from "../../utils/istDateTime"
import { useAppDispatch, useAppSelector } from "../../hooks"

export default function OrderList() {
    const { adminOrders = [], loading, error, isOrderDeleted } = useAppSelector(state => state.orderState)

    const dispatch = useAppDispatch();
    let sno = 0;

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: 'top-center',
                onOpen: () => dispatch(clearOrderError())
            })
            return
        }
        if (isOrderDeleted) {
            toast.success('Order Deleted Succesfully!', {
                position: 'top-center',
                onOpen: () => dispatch(clearIsOrderDeleted())
            })
            return;
        }

        dispatch(adminOrdersAction)
    }, [dispatch, error, isOrderDeleted])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'S.No ↕',
                    field: 'sno',
                    sort: 'asc'

                },
                {
                    label: 'Date ↕',
                    field: 'date',
                    sort: 'desc'
                },
                {
                    label: 'Order ID ↕',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name ↕',
                    field: 'fullName',
                    sort: 'asc'
                },
                {
                    label: 'Email ↕',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Amount ↕',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status ↕',
                    field: 'status',
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

        adminOrders.forEach(order => {
            data.rows.push({
                sno: ++sno,
                date: istDateTime(order.createdAt),
                id: <Link to={`/admin/order/${order._id}`} className="text-primary">{order._id}</Link>,
                fullName: order.user.fullName,
                email: order.user.email,
                amount: formatRupees(order.totalPrice),
                status: order.orderStatus,
                actions: (
                    <div className="text-nowrap">
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, order._id)} className="btn btn-danger ms-1">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id))
    }


    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={'Order List'} />
                    <AdminBar />
                    <div className="p-4">
                        <h1 className="my-1 ps-2">Order List</h1>
                        {loading ? <Loader /> :
                            <div className="table-responsive">
                                <MDBDataTable
                                    data={setOrders()}
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