import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { countries } from 'countries-list'
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";



export default function Shipping() {
    const { shippingInfo = {}, cartItems, loading } = useSelector(state => state.cartState)
    const { authUser } = useSelector(state => state.authState)

    const [inputs, setInputs] = useState({
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        phoneNumber: ""
    })

    useEffect(() => {
        if (!cartItems.length > 0) {
            toast.error('Please add items in the cart', { position: 'top-center' })
            navigate('/cart');
        }

        setInputs(shippingInfo);
        if (!shippingInfo.fullName) {
            if (authUser.address) {
                setInputs(values => ({
                    ...values,
                    fullName: authUser.fullName,
                    addressLine1: authUser.address.addressLine1,
                    addressLine2: authUser.address.addressLine2,
                    city: authUser.address.city,
                    state: authUser.address.state,
                    country: authUser.address.country,
                    postalCode: authUser.address.postalCode,
                    phoneNumber: authUser.phoneNumber
                }));

            }
        }
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const countryList = Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    function handleReset() {
        setInputs({
            fullName: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            country: "India",
            postalCode: "",
            phoneNumber: ""
        })
        toast.info("Reset Successfully", { position: 'top-center' });

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const { fullName, addressLine1, addressLine2, city, state, country, postalCode, phoneNumber } = inputs;
        dispatch(saveShippingInfo({ fullName, addressLine1, addressLine2, city, state, country, postalCode, phoneNumber }))
        navigate('/order/confirm')
    }


    return (
        <>
            <MetaData title={'Shipping Info'} />
            <CheckoutSteps shipping />
            <div className="row align-items-center justify-content-center mb-3">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-25">
                        <form className="mm-input-box-color" onSubmit={handleSubmit}>
                            <h1 className="mb-4">Shipping Info</h1>
                            <div className="form-group mt-1">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input type="text" className="form-control" id="fullName" name="fullName" value={inputs.fullName} onChange={handleChange} placeholder="Enter Full Name" required />
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
                                <input type="text" className="form-control" id="addressLine1" name="addressLine1" value={inputs.addressLine1} placeholder="House No, Building" onChange={handleChange} required />

                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
                                <input type="text" className="form-control" id="addressLine2" name="addressLine2" value={inputs.addressLine2} placeholder="Street, Area" onChange={handleChange} required />

                            </div>

                            <div className="row mt-3">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" className="form-control" id="city" name="city" value={inputs.city} placeholder="City" onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="stateCode" className="form-label">State</label>
                                        <input type="text" className="form-control" id="stateCode" name="state" value={inputs.state} placeholder="State" onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <select className="form-control" id="country" name="country" value={inputs.country} onChange={handleChange} required>
                                            {countryList.map((country, i) => (
                                                <option key={i} value={country.name}>
                                                    {country.name}
                                                </option>
                                            ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="postalCode" className="form-label">Postal Code</label>
                                        <input type="number" id="postalCode" className="form-control" name="postalCode" placeholder="Postal Code" value={inputs.postalCode} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <input type="number" className="form-control" id="phoneNumber" name="phoneNumber" value={inputs.phoneNumber} placeholder="Enter phone number" onChange={handleChange} required />
                            </div>

                            <div className="mt-3 text-center">

                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary " role="status">
                                        </div>
                                    </div>) : null
                                }

                                <button type="reset" className="btn btn-danger me-5" onClick={handleReset}>Reset</button>
                                <button type="submit" className="btn btn-success">Continue</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}