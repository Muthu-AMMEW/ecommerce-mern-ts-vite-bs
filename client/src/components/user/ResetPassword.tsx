import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../actions/authActions';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../layouts/MetaData';
import { clearAuthError } from '../../slices/authSlice';
import { useAppSelector } from '../../hooks';

export default function ResetPassword() {
    const [inputs, setInputs] = useState({
        password: "",
        confirmPassword: ""
    })

    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useAppSelector(state => state.authState)
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        if (isAuthenticated) {
            toast.success('Password Reset Success!', { position: 'top-center' })
            navigate('/')
            return;
        }
        if (error) {
            toast.error(error, {
                position: 'top-center',
                onOpen: () => dispatch(clearAuthError())
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
        toast.info("Reset Successfully", { position: 'top-center' });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputs.password !== inputs.confirmPassword) {
            toast.error("Password Mismatch", { position: 'top-center' });
            return
        }

        if (inputs.password.length < 6) {
            toast.error("Password must be at least 6 characters", { position: 'top-center' })
            return
        }

        const formData = new FormData();
        formData.append('password', inputs.password);
        formData.append('confirmPassword', inputs.confirmPassword);

        dispatch(resetPassword(formData, token))

    }

    return (
        <>
            <MetaData title={'Reset Password'} />
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Reset Password</div>
                        <form className="w-100" onSubmit={handleSubmit}>

                            <div className="w-100 mt-3">
                                <label htmlFor="password" className="form-label">Create a password</label>
                                <input type="password" className="form-control" id="password" name="password" value={inputs.password} onChange={handleChange} placeholder="Enter password" required />
                            </div>
                            <div className="w-100 mt-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm your password</label>
                                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={inputs.confirmPassword} onChange={handleChange} placeholder="Enter Confirm password" required />
                            </div>

                            <div className="mt-3 text-center">
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