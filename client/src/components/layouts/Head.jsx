import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import UserDropDown from './UserDropDown';
import SocialNetworks from './SocialNetworks';


export default function Head() {

    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { cartItems } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(logout);
    }

    return (
        <nav className="navbar navbar-expand-lg mm-navbg p-0">
            <div className="container-fluid d-flex p-1">
                <div className="d-flex">
                    <Link className="navbar-brand d-flex me-2" to={"/"}>
                        <img className="rounded-5" src="./images/logo.png" alt="logo" width="60" height="60" />
                        <h5 className="mt-3 ms-2 text-white">Ecommerce</h5>
                    </Link>
                    <Link to={"/home"} className="btn btn-danger d-none d-sm-block my-3 mx-1">Home</Link>
                    {!isAuthenticated && <Link to={"/login"} className="btn btn-success d-lg-none my-3 mx-1">Login</Link>}

                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ms-3 ms-lg-0" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <SocialNetworks />
                    </ul>
                    <Search />


                    {!isAuthenticated && <div className='d-flex justify-content-start m-3'>
                        <Link to={"/login"} className="btn btn-success me-3 d-none d-lg-block">Login</Link>
                        <Link to={"/register"} className="btn btn-warning text-nowrap">Sign Up</Link>

                    </div>}

                    {isAuthenticated && <div className='d-flex justify-content-around m-4 m-lg-0 mx-lg-5 mt-lg-2'>
                        <UserDropDown />

                        <Link to={"/login"} className="nav-link d-flex flex-column align-items-start mt-2 mx-5" onClick={logoutHandler}>
                            <div className=" d-flex flex-column align-items-center"><i className="fa-solid fa-arrow-right-from-bracket fa-xl mb-3" style={{ color: "#63E6BE" }}></i>
                                <h6>Logout</h6></div></Link>

                        <Link className="d-flex flex-column align-items-start" to={"/cart"}>

                            <div className=" d-flex flex-column align-items-center">
                                <h5 className="badge text-black mx-2 p-0">{cartItems.length}</h5>
                                <i className="fa-solid fa-cart-shopping fa-beat fa-xl mt-1" style={{ color: "#FFD43B" }}></i>
                            </div>
                        </Link>
                    </div>}
                    <Link to={"/home"} className="btn btn-danger d-block d-sm-none m-3 my-lg-3 mx-lg-1">Home</Link>
                </div>
            </div >
        </nav >
    )
}