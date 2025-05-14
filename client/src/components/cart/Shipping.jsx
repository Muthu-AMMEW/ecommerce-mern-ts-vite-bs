import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { countries } from 'countries-list'
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";

export const validateShipping = (shippingInfo, navigate) => {

    if (
        !shippingInfo.addressLine1 ||
        !shippingInfo.addressLine2 ||
        !shippingInfo.city ||
        !shippingInfo.state ||
        !shippingInfo.country ||
        !shippingInfo.postalCode ||
        !shippingInfo.phoneNo

    ) {
        toast.error('Please fill the shipping information', { position: toast.POSITION.BOTTOM_CENTER })
        navigate('/shipping')
    }
}


export default function Shipping() {
    const { shippingInfo = {} } = useSelector(state => state.cartState)

    const [inputs, setInputs] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        phoneNo: ""
    })

    useEffect(() => {
        setInputs(shippingInfo);
    }, [shippingInfo]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const countryList = Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const { addressLine1, addressLine2, city, state, country, postalCode, phoneNo } = inputs;
        dispatch(saveShippingInfo({ addressLine1, addressLine2, city, state, country, postalCode, phoneNo }))
        navigate('/order/confirm')
    }


    return (
        <>
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field1">Address Line 1</label>
                            <input
                                type="text"
                                id="address_field1"
                                className="form-control"
                                name="addressLine1"
                                placeholder="House No, Building"
                                value={inputs.addressLine1}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address_field2">Address Line 2</label>
                            <input
                                type="text"
                                id="address_field2"
                                name="addressLine2"
                                placeholder="Street, Area"
                                className="form-control"
                                value={inputs.addressLine2}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                name="city"
                                placeholder="City"
                                className="form-control"
                                value={inputs.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input
                                type="text"
                                id="state_field"
                                name="state"
                                placeholder="State"
                                className="form-control"
                                value={inputs.state}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                name="country"
                                value={inputs.country}
                                onChange={handleChange}
                                required

                            >{countryList.map((country, i) => (

                                <option key={i} value={country.name}>
                                    {country.name}
                                </option>
                            ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                name="postalCode"
                                placeholder="Postal Code"
                                value={inputs.postalCode}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                name="phoneNo"
                                placeholder="Phone No"
                                value={inputs.phoneNo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}