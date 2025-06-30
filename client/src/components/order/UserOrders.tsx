import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import { formatRupees } from '../../utils/formatRupees';
import { istDateTime } from '../../utils/istDateTime';
import { useAppSelector } from '../../hooks';

export default function UserOrders() {
    const { userOrders = [], loading = true } = useAppSelector(state => state.orderState)
    const dispatch = useDispatch();
    let sno = 0;

    useEffect(() => {
        dispatch(userOrdersAction)
    }, [dispatch])

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
                    label: 'Items ↕',
                    field: 'numOfItems',
                    sort: 'asc'
                },

                {
                    label: 'Amount ↕',
                    field: 'amount',
                    sort: 'asc'
                },
                // {
                //     label: 'Address ↕',
                //     field: 'address',
                //     sort: 'asc'
                // },
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

        userOrders.forEach(order => {
            data.rows.push({
                sno: ++sno,
                date: istDateTime(order.createdAt),
                id: <Link to={`/order/${order._id}`} className="text-primary">{order._id}</Link>,
                numOfItems: order.orderItems.length,
                amount: formatRupees(order.totalPrice),
                status: order.orderStatus,
                // address: <p>{order.shippingInfo.fullName},<br />
                //     {order.shippingInfo.addressLine1},<br />
                //     {order.shippingInfo.addressLine2},<br />
                //     {order.shippingInfo.city}, {order.shippingInfo.state},<br />
                //     {order.shippingInfo.country},Pin Code: {order.shippingInfo.postalCode}.<br />
                //     Phone No.: {order.shippingInfo.phoneNumber}</p>,
                actions: <Link to={`/order/${order._id}`} className="btn btn-primary" >
                    <i className='fa fa-eye'></i>
                </Link>
            })
        })


        return data;
    }


    return (
        <>
            <MetaData title="My Orders" />
            <h1 className='m-3'>My Orders</h1>
            {loading ? <Loader /> :
            <div className="table-responsive">
                <MDBDataTable
                    className='px-3'
                    bordered
                    striped
                    hover
                    data={setOrders()}
                />
            </div>}
        </>
    )
}