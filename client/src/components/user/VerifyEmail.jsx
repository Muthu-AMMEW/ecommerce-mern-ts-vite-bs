import { useEffect, useState } from 'react';
import { generateOtp, verifyEmail } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MetaData from '../layouts/MetaData';
import { useNavigate } from 'react-router-dom';
import { clearAuthError, clearIsVerified, clearMessage } from '../../slices/authSlice';

export default function VerifyEmail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isVerified, error, loading, user, message } = useSelector(state => state.authState)
    const [inputs, setInputs] = useState({
        otp: ""
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {

        if (isVerified) {
            toast.success('Email verified successfully', {
                position: 'top-center',
                onOpen: () => dispatch(clearIsVerified())
            })
            navigate('/');
            return
        }

        if (user?.role !== "unverified") {
            navigate('/');
            return
        }

        if (message) {
            toast.success(message, {
                position: 'top-center',
                onOpen: () => dispatch(clearMessage())
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
    }, [message, isVerified, user?.role, error, dispatch])

    function generate() {
        const formData = new FormData();
        formData.append('email', user.email);
        dispatch(generateOtp(formData))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('otp', inputs.otp);
        dispatch(verifyEmail(formData))
    }

    return (
        <>
            <MetaData title={'Update Password'} />
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Verify Email Address</div>
                        <form className="w-100 mm-input-box-color" onSubmit={handleSubmit}>

                            <div className="w-100 mt-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="email" name="email" value={user?.email} disabled />
                            </div>
                            <div className="w-100 mt-3">
                                <label htmlFor="otp" className="form-label">OTP</label>
                                <input type="password" className="form-control w-50" id="otp" name="otp" value={inputs.otp} onChange={handleChange} placeholder="Enter OTP" minLength={8} maxLength={8} required />
                            </div>

                            <div className="mt-3 text-center">
                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary " role="status">
                                        </div>
                                    </div>) : null
                                }
                                <div className='d-flex justify-content-center'>
                                    <button className="btn btn-warning me-2 me-md-5" type="button" disabled={loading} onClick={generate}>Generate OTP</button>
                                    <button className="btn btn-success" type="submit" disabled={loading}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}