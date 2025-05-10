import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { user } = useSelector(state => state.authState);

    return ( 
        <div className='row p-5 bg-body-secondary'>
            <div className=' col-12 col-md-6'>
                <div className='row'>
                    <div className='col-12 text-center mt-1 mb-4 mt-md-5'>

                        <img className="rounded-circle"  src={user.avatar.image ?? './images/default_avatar.png'} alt='...' width={300} height={300} />

                    </div>
                    <div className='col-12 text-center'>
                        <Link to={"/myprofile/update"} className='btn btn-success me-3'>Update Profile</Link>
                        <Link to={"/myprofile/update/password"} className='btn btn-danger mt-1 mt-sm-0'>Change Password</Link>
                    </div>

                </div>
            </div>
            <div className='col-12 col-md-6 ps-5 pt-5'>
                <h4>Full Name</h4>
                <p>{user.fullName}</p>

                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Joined</h4>
                <p className='pb-3'>{String(user.createdAt).substring(0, 10)}</p>

                <h4>Address</h4>
                <p className='w-50'>{user.address}</p>

                <h4>Phone Number</h4>
                <p>{user.pno}</p>


            </div>

        </div>
    )
}