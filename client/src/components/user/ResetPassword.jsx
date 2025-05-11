import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearAuthError } from '../../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const [inputs, setInputs] = useState({
        password: "",
        confirmPassword: ""
    })

    const initialStateErrors = {
        password: false,
        confirmPassword: false,
        custom_error: null
    };

    const [errors, setErrors] = useState(initialStateErrors);

    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.authState)
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        if (isAuthenticated) {
            toast('Password Reset Success!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
            navigate('/')
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
    }, [isAuthenticated, error, dispatch, navigate])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    function handleReset() {
        setInputs({
            password: "",
            confirmPassword: ""
        })
        toast.info("Reset Successfully");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;

        if (inputs.password === "") {
            errors.password = true;
            hasError = true;
        }
        if (inputs.confirmPassword !== inputs.password) {
            errors.confirmPassword = true;
            hasError = true;
        }

        if (!hasError) {
            const formData = new FormData();
            formData.append('password', inputs.password);
            formData.append('confirmPassword', inputs.confirmPassword);

            dispatch(resetPassword(formData, token))
        }
        setErrors(errors);
    }

    return (
        <>
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Reset Password</div>
                        <form className="w-100" onSubmit={handleSubmit}>

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