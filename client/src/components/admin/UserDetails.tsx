import { useEffect, useState } from "react";
import AdminBar from "./AdminBar";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../actions/authActions";
import { clearUserError } from "../../slices/userSlice";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { istDateTime } from "../../utils/istDateTime";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function UserDetails() {
    const { id } = useParams();
    const { loading, error, user } = useAppSelector(state => state.userState)
    const { authUser } = useAppSelector(state => state.authState)
    const dispatch = useAppDispatch();

    useEffect(() => {

        if (error) {
            toast.error(error, {
                position: 'top-center',
                onOpen: () => dispatch(clearUserError())
            })
            return
        }

        dispatch(getUser(id))
    }, [id, error, dispatch])


    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={'User Details'} />
                    <AdminBar />
                    <div className='row p-5'>
                        <div className=' col-12 col-md-6'>
                            <div className='row'>
                                <div className='col-12 text-center mt-1 mb-4 mt-md-5'>

                                    <img className="rounded-circle object-fit-cover" src={user.avatar?.image ?? './images/default_avatar.png'} alt='...' width={300} height={300} />

                                </div>
                                {
                                    user._id === authUser._id && <div className='col-12 text-center'>
                                        <Link to={"/myprofile/update"} className='btn btn-success me-3'>Update Profile</Link>
                                        <Link to={"/myprofile/update/password"} className='btn btn-danger mt-1 mt-sm-0'>Change Password</Link>
                                    </div>
                                }

                            </div>
                        </div>
                        <div className='col-12 col-md-6 ps-5 pt-5'>
                            <h4>Full Name</h4>
                            <p>{user.fullName}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined</h4>
                            <p className='pb-3'>{istDateTime(user.createdAt)}</p>
                            
                            <h4>Address</h4>
                            {user.address ?
                                <p className='w-50'>{`${user.address?.addressLine1},
                                    \n${user.address?.addressLine2},
                                    \n${user.address?.city}, ${user.address?.state},
                                    \n${user.address?.country}, Postal Code: ${user.address?.postalCode}.`}</p> : <br />}

                            <h4>Phone Number</h4>
                            <p>{user.phoneNumber}</p>

                            <h4>Role</h4>
                            <p>{user.role}</p>
                        </div>
                    </div>

                </>
            }
        </>

    )
}