import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateProfile } from "../../actions/authActions";
import { clearAuthError, clearIsUpdated } from "../../slices/authSlice";
import { countries } from 'countries-list';
import MetaData from "../layouts/MetaData";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function UpdateProfile() {
    const { loading, error, authUser, isUpdated } = useAppSelector(state => state.authState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
            fullName: "",
            phoneNumber: ""
        });
        setAddressInputs({
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            country: "India",
            postalCode: ""
        });
        toast.info("Reset Successfully", { position: 'top-center' });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
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

    useEffect(() => {
        if (authUser) {
            setInputs(values => ({
                ...values,
                fullName: authUser.fullName,
                email: authUser.email,
                phoneNumber: authUser.phoneNumber
            }));
            if (authUser.address) {
                setAddressInputs(values => ({
                    ...values,
                    addressLine1: authUser.address.addressLine1,
                    addressLine2: authUser.address.addressLine2,
                    city: authUser.address.city,
                    state: authUser.address.state,
                    country: authUser.address.country,
                    postalCode: authUser.address.postalCode
                }))
            }

            if (authUser.avatar) {
                setAvatar(authUser.avatar.image)
                setAvatarPreview(authUser.avatar.image)
            }
        }

        if (isUpdated) {
            toast.success('Profile updated successfully', {
                position: 'top-center',
                onOpen: () => dispatch(clearIsUpdated())
            })
            return;
        }

        if (error) {
            toast.error(error, {
                position: 'top-center',
                onOpen: () => dispatch(clearAuthError())
            })
            return
        }
    }, [authUser, isUpdated, error, dispatch])

    return (
        <>
            <MetaData title={'Update Profile'} />
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 my-4 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Update Profile</div>
                        <form className="w-100 mm-input-box-color" onSubmit={handleSubmit} encType='multipart/form-data'>
                            {authUser.verification.email === "unverified" && <div>
                                <p className="text-bg-warning p-1">First, verify your email address. Then, only access this site.</p>
                                <p className="text-bg-info p-1">You can change on this place if you enter the wrong details, such as your email and others.</p>
                            </div>}
                            <div className="w-100 mt-3">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input type="text" className="form-control" id="fullName" name="fullName" value={inputs.fullName} onChange={handleChange} placeholder="Enter Full Name" required />
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <div className='row'>
                                    <div className={authUser.verification.email === "unverified" ? "col-9" : "col-12"}>
                                        <input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Enter your email address" required />
                                    </div>
                                    {authUser.verification.email === "unverified" && <div className="col-3">
                                        <button type="button" className="btn btn-danger" onClick={() => navigate('/verify/email')}>verify</button>
                                    </div>}
                                </div>
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <input type="number" className="form-control" id="phoneNumber" name="phoneNumber" value={inputs.phoneNumber} minLength={10} placeholder="Enter phone number" onChange={handleChange} required />
                            </div>

                            <div className="w-100 mt-3 form-group">
                                <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
                                <input type="text" className="form-control" id="addressLine1" name="addressLine1" value={addressInputs.addressLine1} placeholder="House No, Building" onChange={handleAddressChange} required />

                            </div>

                            <div className="w-100 mt-3 form-group">
                                <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
                                <input type="text" className="form-control" id="addressLine2" name="addressLine2" value={addressInputs.addressLine2} placeholder="Street, Area" onChange={handleAddressChange} required />

                            </div>

                            <div className="row w-100 mt-3">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" className="form-control" id="city" name="city" value={addressInputs.city} placeholder="City" onChange={handleAddressChange} required />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <input type="text" className="form-control" id="state" name="state" value={addressInputs.state} placeholder="State" onChange={handleAddressChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="row w-100 mt-3">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <select className="form-control" id="country" name="country" value={addressInputs.country} onChange={handleAddressChange} required>
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
                                        <label htmlFor="postal" className="form-label">Postal Code</label>
                                        <input type="number" id="postal" className="form-control" name="postalCode" placeholder="Postal Code" value={addressInputs.postalCode} onChange={handleAddressChange} required />
                                    </div>
                                </div>
                            </div>
                            <div className="w-100 mt-3">
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar me-2 item-rtl'>
                                            <img src={avatarPreview} className='rounded-circle' alt='Avatar Preview' />
                                        </figure>
                                    </div>
                                    <div className='custom-file'>
                                        <input type='file' id='customFile' name='avatar' onChange={handleChange} />
                                        <label className='form-label' htmlFor='customFile'>
                                            Choose Avatar
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 text-center">

                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary " role="status">
                                        </div>
                                    </div>) : null
                                }

                                <button type="submit" className="btn btn-primary me-5" disabled={loading}>Update</button>
                                <button type="reset" className="btn btn-danger" onClick={handleReset}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
