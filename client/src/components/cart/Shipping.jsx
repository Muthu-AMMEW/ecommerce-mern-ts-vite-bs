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
    const { user } = useSelector(state => state.authState)

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
        if(!cartItems.length > 0){
             toast('Please add items in the cart', {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER
            })
            navigate('/cart');
        }
        
        setInputs(shippingInfo);
        if (!shippingInfo.fullName) {
            if (user.address) {
                setInputs(values => ({
                    ...values,
                    fullName: user.fullName,
                    addressLine1: user.address.addressLine1,
                    addressLine2: user.address.addressLine2,
                    city: user.address.city,
                    state: user.address.state,
                    country: user.address.country,
                    postalCode: user.address.postalCode,
                    phoneNumber: user.phoneNumber
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
        toast.info("Reset Successfully");

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
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="w-100 mt-1">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="fullName" name="fullName" value={inputs.fullName} onChange={handleChange} placeholder="Enter Full Name" required />
                        </div>

                        <div className="w-100 mt-3 form-group">
                            <label htmlFor="address_field1">Address Line 1</label>
                            <input type="text" className="form-control" id="address_field1" name="addressLine1" value={inputs.addressLine1} placeholder="House No, Building" onChange={handleChange} required />

                        </div>

                        <div className="w-100 mt-3 form-group">
                            <label htmlFor="address_field2">Address Line 2</label>
                            <input type="text" className="form-control" id="address_field2" name="addressLine2" value={inputs.addressLine2} placeholder="Street, Area" onChange={handleChange} required />

                        </div>

                        <div className="row w-100 mt-3">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="city_field">City</label>
                                    <input type="text" className="form-control" id="city_field" name="city" value={inputs.city} placeholder="City" onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="state_field">State</label>
                                    <input type="text" className="form-control" id="state_field" name="state" value={inputs.state} placeholder="State" onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="row w-100 mt-3">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="country">Country</label>
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
                                    <label htmlFor="postal">Postal Code</label>
                                    <input type="number" id="postal" className="form-control" name="postalCode" placeholder="Postal Code" value={inputs.postalCode} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="w-100 mt-3">
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
                            <button type="submit" className="btn btn-primary">Continue</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}