import { Link } from "react-router-dom";

export default function CheckoutSteps({ shipping, confirmOrder, payment }: { shipping?: boolean; confirmOrder?: boolean; payment?: boolean; }) {
    return (

        <div className="checkout-progress d-flex justify-content-center mt-5 ms-1">
            {
                shipping ?
                    <Link to="/shipping">
                        <div className="triangle2-active"></div>
                        <div className="step active-step text-center">Shipping Info</div>
                        <div className="triangle-active"></div>
                    </Link> :
                    <Link to="/shipping">
                        <div className="triangle2-incomplete"></div>
                        <div className="step incomplete text-center">Shipping Info</div>
                        <div className="triangle-incomplete"></div>
                    </Link>
            }

            {confirmOrder ?
                <Link to="/order/confirm">
                    <div className="triangle2-active"></div>
                    <div className="step active-step text-center">Confirm Order</div>
                    <div className="triangle-active"></div>
                </Link> :
                <Link to="/order/confirm">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete text-center">Confirm Order</div>
                    <div className="triangle-incomplete"></div>
                </Link>
            }


            {payment ?
                <Link to="/payment">
                    <div className="triangle2-active"></div>
                    <div className="step active-step text-center">Payment</div>
                    <div className="triangle-active"></div>
                </Link> :
                <Link to="/payment">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete text-center">Payment</div>
                    <div className="triangle-incomplete"></div>
                </Link>
            }

        </div>
    )
}