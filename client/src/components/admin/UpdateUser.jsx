import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import { toast } from "react-toastify";

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

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', inputs.fullName);
        formData.append('email', inputs.email);
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
    }, [isUserUpdated, error, dispatch])


    useEffect(() => {
        if (user._id) {
            setInputs(values => ({
                ...values,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }));
        }
    }, [user])


    return (<>
        <div className="row">
            <div className="col-12 col-md-2 p-0">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10 mm-bgpic">
                <>
                    <div className="wrapper my-5">
                        <form onSubmit={submitHandler} className="shadow-lg rounded-5 bg-body-tertiary bg-opacity-50" encType='multipart/form-data'>
                            <h1 className="mb-4">Update User</h1>

                            <div className="form-group">
                                <label htmlFor="fullName">Name</label>
                                <input type="text" className="form-control" id="fullName" name="fullName" value={inputs.fullName} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <select className="form-control" id="role" name="role" value={inputs.role} onChange={handleChange} required disabled={user._id === authUser._id}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <div className="mt-1 text-center">

                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary " role="status">
                                        </div>
                                    </div>) : null
                                }

                                <button className="btn btn-primary me-5" type="submit" disabled={loading}>Submit</button>
                            </div>

                        </form>
                    </div>
                </>
            </div>
        </div>
    </>

    )
}