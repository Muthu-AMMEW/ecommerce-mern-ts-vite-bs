import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";

export default function OrderSuccess() {
    return (
        <div className="row justify-content-center">
            <div className="col-6 m-5 text-center">
                <MetaData title={'Order Sucess'} />
                <img className="my-3 img-fluid d-block mx-auto" src="/images/success.png" alt="Order Success" width="200" height="200" />

                <h2>Your Order has been placed successfully.</h2>

                <Link to={"/orders"}><h3>Go to Orders</h3></Link>
            </div>

        </div>
    )
}