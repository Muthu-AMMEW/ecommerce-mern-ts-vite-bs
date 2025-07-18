import AdminBar from "./AdminBar";
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from '../../actions/authActions'
import { adminOrders as adminOrdersAction } from '../../actions/orderActions'
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { formatRupees } from "../../utils/formatRupees";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function Dashboard() {
    const { products = [] } = useAppSelector(state => state.productsState);
    const { adminOrders = [] } = useAppSelector(state => state.orderState);
    const { users = [] } = useAppSelector(state => state.userState);
    const dispatch = useAppDispatch();
    let outOfStock = 0;

    if (products.length > 0) {
        products.forEach((product: any) => {
            if (product.stock <= 0) {
                outOfStock = outOfStock + 1;
            }
        })
    }

    let totalAmount = 0;
    if (adminOrders.length > 0) {
        adminOrders.forEach((order: any) => {
            totalAmount += order.totalPrice
        })
    }

    useEffect(() => {
        dispatch(getAdminProducts);
        dispatch(getUsers);
        dispatch(adminOrdersAction)
    }, [dispatch])


    return (
        <>
            <MetaData title={'Admin Dashboard'} />

            <AdminBar />
            <div className="p-4">
                <div className="row">
                    <h1>Dashboard</h1>
                    <div className="col-xl-12 col-sm-12 mb-3">
                        <div className="card text-white bg-primary o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Total Amount<br /> <b>{formatRupees(totalAmount)}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Products<br /> <b>{products.length}</b></div>
                            </div>
                            <Link className="card-foot text-white clearfix small z-1" to="/admin/products">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>


                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-danger o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Orders<br /> <b>{adminOrders.length}</b></div>
                            </div>
                            <Link className="card-foot text-white clearfix small z-1" to="/admin/orders">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>


                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-info o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Users<br /> <b>{users.length}</b></div>
                            </div>
                            <Link className="card-foot text-white clearfix small z-1" to="/admin/users">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>


                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-warning o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}