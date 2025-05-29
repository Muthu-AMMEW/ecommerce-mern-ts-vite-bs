import { useEffect, useState } from "react";
import AdminBar from "./AdminBar";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";

export default function UpdateUser() {
    const [inputs, setInputs] = useState({ fullName: "", email: "", role: "" });
    const { id: userId } = useParams();

    const { loading, isUserUpdated, error, user } = useSelector(state => state.userState)
    const { user: authUser } = useSelector(state => state.authState)

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('role', inputs.role);
        dispatch(updateUser(userId, formData))
    }

    useEffect(() => {
        if (isUserUpdated) {
            toast('User Updated Succesfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserUpdated())
            })
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }

        dispatch(getUser(userId))
    }, [isUserUpdated, userId, error, dispatch])


    useEffect(() => {
        if (user._id) {
            setInputs(values => ({
                ...values,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber
            }));
        }
    }, [user])


    return (
        <>
            <MetaData title={'Update User'} />
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Update User Role</div>
                        <form className="w-100" onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className="w-100 mt-3">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input type="text" className="form-control" id="fullName" name="fullName" value={inputs.fullName} onChange={handleChange} placeholder="Enter Full Name" disabled />
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Enter your email address" disabled />
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <input type="number" className="form-control" id="phoneNumber" name="phoneNumber" value={inputs.phoneNumber} placeholder="Enter phone number" onChange={handleChange} disabled />
                            </div>

                            <div className="w-100 mt-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select className="form-control" id="role" name="role" value={inputs.role} onChange={handleChange} required disabled={user._id === authUser._id}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <div className="mt-4 text-center">

                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary " role="status">
                                        </div>
                                    </div>) : null
                                }

                                <button className="btn btn-primary" type="submit" disabled={loading}>Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}