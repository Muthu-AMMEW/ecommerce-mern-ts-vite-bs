import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    const redirect = location.search ? '/' + location.search.split('=')[1] : '/home';

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    function handleReset() {
        setInputs({
            email: "",
            password: ""
        })
        toast.info("Reset Successfully", { position: 'top-center' });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login(inputs.email, inputs.password))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect)
        }

        if (error) {
            toast(error, {
                position: 'top-center',
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [error, isAuthenticated, redirect, dispatch, navigate])

    return (
        <>
            <MetaData title={`Login`} />
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">

                        <div className='text-center h2'>Log In</div>
                        <form className="w-100 mm-input-box-color" onSubmit={handleSubmit}>
                            <div className="w-100 mt-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={inputs.email} onChange={handleChange} required />
                            </div>
                            <div className="w-100 mt-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" value={inputs.password} onChange={handleChange} required />
                            </div>
                            <div className="d-flex justify-content-between w-100 mt-3">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" name="remember" value={inputs.remember} onChange={handleChange} /> Remember me
                                    </label>

                                </div>
                                <div><a href="/password/forgot" className="fw-bold">Forget Password?</a></div>
                            </div>
                            <div className="mt-3 text-center">
                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>) : null
                                }
                                <button className="btn btn-primary me-5" type="submit" disabled={loading}>Submit</button>
                                <button className="btn btn-danger" type="reset" onClick={handleReset}>Reset</button>
                            </div>
                            <div className="text-center mt-4">Do not have an account? <Link className="fw-bold" to="/register">Sign up</Link></div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}