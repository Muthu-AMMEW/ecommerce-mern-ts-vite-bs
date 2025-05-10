import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {
    const { loading, error, user, isUpdated } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({ fullName: "", email: "", pno: ""});
    const initialStateErrors = {
        fullName: false,
        email: false,
        pno: false,
        // address: false,
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

    function handleReset() {
        setInputs({
            fullName: false,
            email: false,
            pno: false
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
        if (inputs.pno === "") {
            errors.pno = true;
            hasError = true;
        }
        // if (inputs.address === "") {
        //     errors.address = true;
        //     hasError = true;
        // }

        if (!hasError) {
            const formData = new FormData();
            formData.append('fullName', inputs.fullName)
            formData.append('email', inputs.email)
            formData.append('pno', inputs.pno)
            formData.append('avatar', avatar);
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
                pno: user.pno
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
                            <label htmlFor="pno" className="form-label">Phone Number</label>
                            <input type="number" className="form-control" id="pno" onChange={handleChange} placeholder="Enter phone number" name="pno" value={inputs.pno} />
                            {errors.pno ?
                                (<span className="text-danger bg-warning-subtle" >
                                    Phone Number is required.
                                </span>) : null
                            }
                        </div>
                        {/* <div className="w-100 mt-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <textarea name="address" value={inputs.address} className="form-control" id="address" onChange={handleChange} placeholder="Enter your address"></textarea>
                            {errors.address ?
                                (<span className="text-danger bg-warning-subtle" >
                                    Address is required.
                                </span>) : null
                            }
                        </div> */}
                        <div className="w-100 mt-3">
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={handleChange}
                                    />
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
