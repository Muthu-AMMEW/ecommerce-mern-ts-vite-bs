import { Link } from 'react-router-dom';
import { istDateTime } from '../../utils/istDateTime';
import MetaData from '../layouts/MetaData';
import { useAppSelector } from '../../hooks';

export default function Profile() {
    const { authUser } = useAppSelector(state => state.authState);

    return (
        <>
        <MetaData title={'My Profile'} />
            <div className='row p-5'>
                <div className=' col-12 col-md-6'>
                    <div className='row'>
                        <div className='col-12 text-center mt-1 mb-4 mt-md-5'>

                            <img className="rounded-circle object-fit-cover" src={authUser.avatar?.image ?? './images/default_avatar.png'} alt='...' width={300} height={300} />

                        </div>
                        <div className='col-12 text-center'>
                            <Link to={"/myprofile/update"} className='btn btn-success me-3'>Update Profile</Link>
                            <Link to={"/myprofile/update/password"} className='btn btn-danger mt-1 mt-sm-0'>Change Password</Link>
                        </div>

                    </div>
                </div>
                <div className='col-12 col-md-6 ps-5 pt-5'>
                    <h4>Full Name</h4>
                    <p>{authUser.fullName}</p>

                    <h4>Email Address</h4>
                    <p>{authUser.email}</p>

                    <h4>Joined</h4>
                    <p className='pb-3'>{istDateTime(authUser.createdAt)}</p>

                    <h4>Address</h4>
                    {authUser.address ?
                        <p className='w-50'>{`${authUser.address?.addressLine1},
                                    \n${authUser.address?.addressLine2},
                                    \n${authUser.address?.city}, ${authUser.address?.state},
                                    \n${authUser.address?.country}, Postal Code: ${authUser.address?.postalCode}.`}</p> : <br />}

                    <h4>Phone Number</h4>
                    <p>{authUser.phoneNumber}</p>
                </div>
            </div>
        </>
    )
}