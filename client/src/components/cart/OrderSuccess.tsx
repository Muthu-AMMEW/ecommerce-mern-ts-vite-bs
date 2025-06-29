import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";

export default function OrderSuccess() {
    return (
        <>  
            <MetaData title={'Order Success'} />
            <div className="row justify-content-center">
                <div className="col-6 m-5 text-center">
                    <MetaData title={'Order Sucess'} />
                    <img className="my-3 img-fluid d-block mx-auto shadow rounded-circle border border-2" src="/images/success.png" alt="Order Success" width="200" height="200" />

                    <h2>Your Order has been placed successfully.</h2>

                    <Link to={"/orders"}><p className="btn btn-warning shadow border border-1 border-black">Go to Orders</p></Link>
                </div>
            </div>
        </>
    )
}