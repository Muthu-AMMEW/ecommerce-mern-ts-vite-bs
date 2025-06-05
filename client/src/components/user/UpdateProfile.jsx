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
            phoneNumber: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            country: "",
            postalCode: ""
        })
        toast.info("Reset Successfully");

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
        if (user) {
            setInputs(values => ({
                ...values,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber
            }));
            if (user.address) {
                setAddressInputs(values => ({
                    ...values,
                    addressLine1: user.address.addressLine1,
                    addressLine2: user.address.addressLine2,
                    city: user.address.city,
                    state: user.address.state,
                    country: user.address.country,
                    postalCode: user.address.postalCode
                }))
            }

            if (user.avatar) {
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

                <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 my-4 rounded-5 bg-body-tertiary bg-opacity-50">
                    <div className='text-center h2'>Update Profile</div>
                    <form className="w-100 mm-input-box-color" onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className="w-100 mt-3">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="fullName" name="fullName" value={inputs.fullName} onChange={handleChange} placeholder="Enter Full Name" required />
                        </div>

                        <div className="w-100 mt-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Enter your email address" required />
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

                            <button type="submit" className="btn btn-primary me-5" disabled={loading}>Submit</button>
                            <button type="reset" className="btn btn-danger" onClick={handleReset}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}
