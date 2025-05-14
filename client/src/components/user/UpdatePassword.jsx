import { useEffect, useState } from 'react';
import { updatePassword as updatePasswordAction, clearAuthError } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function UpdatePassword() {

    const dispatch = useDispatch();
    const { isUpdated, error, isAuthenticated, loading } = useSelector(state => state.authState)
    const [inputs, setInputs] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    function handleReset() {
        setInputs({
            oldPassword: "",
            password: "",
            confirmPassword: ""
        })
        toast.info("Reset Successfully");
    }


    useEffect(() => {
        if (isUpdated) {
            toast('Password updated successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
            setInputs({
                oldPassword: "",
                password: "",
                confirmPassword: ""
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
    }, [isUpdated, error, dispatch])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputs.password !== inputs.confirmPassword) {
            toast.error("Password Mismatch", {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error'
            })
            return
        }

        if (inputs.password.length < 6) {
            toast.error("Password must be at least 6 characters", {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error'
            })
            return
        }    

        if (isAuthenticated) {
            const formData = new FormData();
            formData.append('oldPassword', inputs.oldPassword);
            formData.append('password', inputs.password);
            dispatch(updatePasswordAction(formData))
        }

    }

    return (
        <>
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Change Password</div>
                        <form className="w-100" onSubmit={handleSubmit}>

                            <div className="w-100 mt-3">
                                <label htmlFor="oldPassword" className="form-label">Enter old password</label>
                                <input type="password" className="form-control" id="oldPassword" name="oldPassword" value={inputs.oldPassword} onChange={handleChange} placeholder="Enter old password" required />
                            </div>

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