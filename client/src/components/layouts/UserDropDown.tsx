import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks';

export default function UserDropDown() {
    const { authUser } = useAppSelector(state => state.authState);

    return (
        <>
            <div className="dropdown">

                <a className="nav-link dropdown-toggle" href="javascript:void(0)" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <figure className='avatar avatar-nav'>
                        <img width="50px" src={authUser?.avatar?.image ?? '/images/default_avatar.png'} />
                    </figure>

                </a>
                <ul className="dropdown-menu">

                    <li><Link to={"/myprofile"} className="dropdown-item border border-2 fw-medium">{authUser?.fullName}</Link>
                    </li>

                    <li><Link className="dropdown-item" to={"/myprofile"}>
                        <i className="fa-regular fa-id-card"></i><span className="h6 m-2">Profile</span></Link>
                    </li>

                    <li>
                        <Link className="dropdown-item" to={"/cart"}>
                            <i className="fa-solid fa-cart-shopping fa-beat" style={{ color: "#FFD43B" }}></i><span className="h6 m-2">Cart</span>
                        </Link>
                    </li>

                    {authUser?.role === 'admin' ? <li><Link className="dropdown-item" to={'/admin/dashboard'}><i className="fa-solid fa-bars-progress fa-fade"></i><span className="h6 m-2">Dashboard</span></Link></li> : null}

                    <li><Link className="dropdown-item fw-medium" to={'/orders'}><i className="fa-solid fa-truck-fast fa-beat-fade me-2" style={{ color: "#63E6BE" }}></i>Orders</Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li><h5 className='ms-3'>Supports</h5>
                    </li>
                    <li><a className="dropdown-item me-2" href="https://m.me/Muthu.AMMEW?text=Please%20helps%20to%20me"><i
                        className="fa-brands fa-facebook-messenger fa-shake fa-xl me-2" style={{ color: "#0080f7" }}></i>Messenger</a>
                    </li>
                    <li><a className="dropdown-item me-2" href="https://wa.me/918072499102?text=Hi" target="_blank" rel="noreferrer"><i
                        className="fa-brands fa-square-whatsapp fa-shake fa-xl me-2" style={{ color: "#25d366" }}></i><span className="h6 ms-1">Whatsapp</span></a>
                    </li>
                    <li><a className="dropdown-item me-2" href="mailto:muthu.ammew333@gmail.com" target="_blank" rel="noreferrer"><i
                        className="fa-solid fa-envelope fa-bounce fa-xl me-2" style={{ color: "#ea4335" }}></i><span className="h6 ms-1">Email</span></a>
                    </li>
                </ul>
            </div>
        </>
    )
}
