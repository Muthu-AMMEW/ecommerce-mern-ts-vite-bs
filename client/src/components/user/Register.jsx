import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { register, clearAuthError } from '../../actions/userActions'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        pno: "",
        password: "",
        confirmPassword: "",
        terms: true
    })

    const initialStateErrors = {
        fullName: false,
        email: false,
        pno: false,
        password: false,
        confirmPassword: false,
        terms: false,
        custom_error: null
    };
    const [errors, setErrors] = useState(initialStateErrors);

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)

    const handleChange = (event) => {
        if (event.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(event.target.files[0])
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            const name = event.target.name;
            const value = event.target.value;
            setInputs(values => ({ ...values, [name]: value }))
        }
    }


    function handleReset() {
        setInputs({
            fullName: "",
            email: "",
            pno: "",
            password: "",
            confirmPassword: "",
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
        if (inputs.password === "") {
            errors.password = true;
            hasError = true;
        }
        if (inputs.confirmPassword !== inputs.password) {
            errors.confirmPassword = true;
            hasError = true;
        }
        if (inputs.terms === false) {
            errors.terms = true;
            hasError = true;
        }

        if (!hasError) {
            const formData = new FormData();
            formData.append('fullName', inputs.fullName)
            formData.append('email', inputs.email)
            formData.append('password', inputs.password)
            formData.append('pno', inputs.pno)
            // formData.append('avatar', avatar);
            dispatch(register(formData))
        }
        setErrors(errors);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            return
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [error, isAuthenticated, dispatch, navigate])

    return (
        <>
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Register Now</div>
                        <form className="w-100" onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className="w-100 mt-3">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input type="text" className="form-control" name="fullName" value={inputs.fullName} id="fullName" onChange={handleChange} placeholder="Enter your full name" />
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
                                <input type="number" className="form-control" id="pno" onChange={handleChange} placeholder="Enter your phone number" name="pno" value={inputs.pno} />
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
                                <label htmlFor="password" className="form-label">Create a password</label>
                                <input type="password" className="form-control" id="password" onChange={handleChange} placeholder="Enter password" name="password" value={inputs.password} />
                                {errors.password ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Password is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="w-100 mt-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm your password</label>
                                <input type="password" className="form-control" id="confirmPassword" onChange={handleChange} placeholder="Enter Confirm password" name="confirmPassword" value={inputs.confirmPassword} />
                                {errors.confirmPassword ?
                                    (<span className="text-danger bg-warning-subtle" >
                                        Password Mismatch.
                                    </span>) : null
                                }
                            </div>

                            <div className="form-check">
                                <label className="form-check-label w-100 mt-3">
                                    <input className="form-check-input" type="checkbox" name="terms" value={inputs.terms} checked={inputs.terms} onChange={handleChange} /> I accept the <a className="fw-bold" href="www.#.com">Terms of Use &
                                        Privacy Policy</a>
                                </label>
                                {errors.terms ?
                                    (<h6 className="text-danger bg-warning-subtle" >
                                        Please agree Terms and Conditons...
                                    </h6>) : null
                                }
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
                            <div className="text-center mt-4">Already have an account? <Link className="fw-bold" to={"/login"}>Log in</Link></div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}