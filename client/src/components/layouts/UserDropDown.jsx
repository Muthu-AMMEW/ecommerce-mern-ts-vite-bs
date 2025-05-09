import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';

export default function UserDropDown() {
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items: cartItems } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(logout);
    }


    return (
        <>
            <div className="dropdown m-3">

                <a className="nav-link dropdown-toggle me-4" href="javascript;" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <figure className='avatar avatar-nav'>
                        <img width="50px" src={user.avatar?.image ?? './images/default_avatar.png'} />
                    </figure>
                    {/* <span className="h6 m-1">{user.fullName}</span> */}

                </a>
                <ul className="dropdown-menu">

                    <li><Link to={"/profile"} className="dropdown-item border border-2 fw-medium">{user.fullName}</Link>
                    </li>

                    <li><Link className="dropdown-item" to={"/myprofile"}>
                        <i className="fa-regular fa-id-card"></i><span className="h6 m-2">Profile</span></Link>
                    </li>

                    <li>
                        <Link className="dropdown-item" to={"/cart"}>
                            <i className="fa-solid fa-cart-shopping fa-beat" style={{ color: "#FFD43B" }}></i><span className="h6 m-2">Cart</span>
                        </Link>
                    </li>

                    {user.role === 'admin' ? <li><Link className="dropdown-item" to={'/admin/dashboard'}><i className="fa-solid fa-bars-progress fa-fade"></i><span className="h6 m-2">Dashboard</span></Link></li> : null}

                    <li><Link className="dropdown-item fw-medium" to={'/orders'}><i className="fa-solid fa-truck-fast fa-beat-fade me-2" style={{ color: "#63E6BE" }}></i>Orders</Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li><a className="dropdown-item me-2" href="https://wa.me/919022690226?text=Hi" target="_blank" rel="noreferrer"><i
                        className="fa-brands fa-square-whatsapp fa-shake fa-2xl me-2" style={{ color: "#25d366" }}></i><span className="h6 ms-1">Chat</span></a></li>
                </ul>
            </div>
        </>
    )
}
