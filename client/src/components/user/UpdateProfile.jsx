import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";
import { countries } from 'countries-list';

export default function UpdateProfile() {
    const { loading, error, user, isUpdated } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const countryList = Object.values(countries);
    const [inputs, setInputs] = useState({ fullName: "", email: "", phoneNumber: "" });
    const [addressInputs, setAddressInputs] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
    })
    const initialStateErrors = {
        fullName: false,
        email: false,
        phoneNumber: false,
        addressLine1: false,
        addressLine2: false,
        city: false,
        state: false,
        country: false,
        postalCode: false,
        custom_error: null
    };
    const [errors, setErrors] = useState(initialStateErrors);
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");

    const handleChange = (event) => {
        if (event.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(event.target.files[0])
                }
            }
            reader.readAsDataURL(event.target.files[0])
        } else {
            const name = event.target.name;
            const value = event.target.value;
            setInputs(values => ({ ...values, [name]: value }))
        }
    }

    const handleAddressChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAddressInputs(values => ({ ...values, [name]: value }))
    }

    function handleReset() {
        setInputs({
            fullName: false,
            email: false,
            phoneNumber: false
        })
        toast.info("Reset Successfully");

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;
        if (inputs.fullName === "") {
            errors.fullName = true;
            hasError = true;
        }
        if (inputs.email === "") {
            errors.email = true;
            hasError = true;
        }
        if (inputs.phoneNumber === "") {
            errors.phoneNumber = true;
            hasError = true;
        }
        if (addressInputs.addressLine1 === "") {
            errors.address = true;
            hasError = true;
        }
        if (addressInputs.addressLine2 === "") {
            errors.address = true;
            hasError = true;
        }
        if (addressInputs.city === "") {
            errors.city = true;
            hasError = true;
        }
        if (addressInputs.state === "") {
            errors.state = true;
            hasError = true;
        }
        if (addressInputs.country === "") {
            errors.country = true;
            hasError = true;
        }
        if (addressInputs.postalCode === "") {
            errors.postalCode = true;
            hasError = true;
        }

        if (!hasError) {
            const formData = new FormData();
            formData.append('fullName', inputs.fullName)
            formData.append('email', inputs.email)
            formData.append('phoneNumber', inputs.phoneNumber)
            formData.append('avatar', avatar);
            formData.append('address[addressLine1]', addressInputs.addressLine1);
            formData.append('address[addressLine2]', addressInputs.addressLine2);
            formData.append('address[city]', addressInputs.city);
            formData.append('address[state]', addressInputs.state);
            formData.append('address[country]', addressInputs.country);
            formData.append('address[postalCode]', addressInputs.postalCode);
            dispatch(updateProfile(formData))
        }
        setErrors(errors);
    }

    useEffect(() => {
        if (user) {
            setInputs(values => ({
                ...values,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber
            }));

            setAddressInputs(values => ({
                ...values,
                addressLine1: user.address.addressLine1,
                addressLine2: user.address.addressLine2,
                city: user.address.city,
                state: user.address.state,
                country: user.address.country,
                postalCode: user.address.postalCode
            }));

            if (user.avatar.image) {
                setAvatar(user.avatar.image)
                setAvatarPreview(user.avatar.image)
            }
        }

        if (isUpdated) {
            toast('Profile updated successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUpdateProfile())
            })
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [user, isUpdated, error, dispatch])

    return (<>
        <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
            <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                    <div className='text-center h2'>Update Profile</div>
                    <form className="w-100" onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className="w-100 mt-3">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input type="text" className="form-control" name="fullName" value={inputs.fullName} id="fullName" onChange={handleChange} placeholder="Enter Full Name" />
                            {errors.fullName ?
                                (<span className="text-danger bg-warning-subtle" >
                                    Full Name is required.
                                </span>) : null
                            }
                        </div>
                        <div className="w-100 mt-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={inputs.email} onChange={handleChange} placeholder="Enter your email address" name="email" />
                            {errors.email ?
                                (<span className="text-danger bg-warning-subtle" >
                                    Email Address is required.
                                </span>) : null
                            }
                        </div>

                        <div className="w-100 mt-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input type="number" className="form-control" id="phoneNumber" onChange={handleChange} placeholder="Enter phone number" name="phoneNumber" value={inputs.phoneNumber} />
                            {errors.phoneNumber ?
                                (<span className="text-danger bg-warning-subtle" >
                                    Phone Number is required.
                                </span>) : null
                            }
                        </div>

                        <div className="w-100 mt-3 form-group">
                            <label htmlFor="address_field1">Address Line 1</label>
                            <input type="text" id="address_field1" className="form-control" name="addressLine1" placeholder="House No, Building" value={addressInputs.addressLine1} onChange={handleAddressChange} required />
                            {errors.addressLine1 ?
                                (<span className="text-danger bg-warning-subtle" >
                                    Address Line 1 is required.
                                </span>) : null
                            }
                        </div>

                        <div className="w-100 mt-3 form-group">
                            <label htmlFor="address_field2">Address Line 2</label>
                            <input type="text" id="address_field2" name="addressLine2" placeholder="Street, Area" className="form-control" value={addressInputs.addressLine2} onChange={handleAddressChange} required />
                            {errors.addressLine2 ?
                                (<span className="text-danger bg-warning-subtle" >
                                    Address Line 2 is required.
                                </span>) : null
                            }
                        </div>

                        <div className="row w-100 mt-3">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="city_field">City</label>
                                    <input type="text" id="city_field" name="city" placeholder="City" className="form-control" value={addressInputs.city} onChange={handleAddressChange} required />
                                    {errors.city ?
                                        (<span className="text-danger bg-warning-subtle" >
                                            city is required.
                                        </span>) : null
                                    }
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="state_field">State</label>
                                    <input type="text" id="state_field" name="state" placeholder="State" className="form-control" value={addressInputs.state} onChange={handleAddressChange} required />
                                    {errors.state ?
                                        (<span className="text-danger bg-warning-subtle" >
                                            State is required.
                                        </span>) : null
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row w-100 mt-3">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="country_field">Country</label>
                                    <select id="country_field" className="form-control" name="country" value={addressInputs.country} onChange={handleAddressChange} required>
                                        {countryList.map((country, i) => (
                                            <option key={i} value={country.name}>
                                                {country.name}
                                            </option>
                                        ))
                                        }
                                    </select>
                                    {errors.country ?
                                        (<span className="text-danger bg-warning-subtle" >
                                            Country is required.
                                        </span>) : null
                                    }
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="postal_code_field">Postal Code</label>
                                    <input type="number" id="postal_code_field" className="form-control" name="postalCode" placeholder="Postal Code" value={addressInputs.postalCode} onChange={handleAddressChange} required />
                                    {errors.postalCode ?
                                        (<span className="text-danger bg-warning-subtle" >
                                            Postal Code is required.
                                        </span>) : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mt-3">
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img src={avatarPreview} className='rounded-circle' alt='Avatar Preview' />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input type='file' name='avatar' className='custom-file-input' id='customFile' onChange={handleChange} />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <span>
                                {errors.custom_error ?
                                    (<p className="text-danger bg-warning-subtle rounded-5">{errors.custom_error}</p>)
                                    : null
                                }
                            </span>
                            {loading ?
                                (<div className="text-center">
                                    <div className="spinner-border text-primary " role="status">
                                    </div>
                                </div>) : null
                            }

                            <button className="btn btn-primary me-5" type="submit">Submit</button>
                            <button className="btn btn-danger" type="reset" onClick={handleReset}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}
