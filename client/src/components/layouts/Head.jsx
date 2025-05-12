import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import UserDropDown from './UserDropDown';
import { useEffect } from "react";
import axios from 'axios';


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
                    <Link className="navbar-brand d-flex" to={"/"}>
                        <img className="rounded-5" src="./images/logo.png" alt="logo" width="60" height="60" />
                        <h5 className="mt-3 ms-2 text-white">Ecommerce</h5>
                    </Link>
                    <div className="m-2 d-md-none"></div>
                    <Link to={"/home"} className="btn btn-danger d-none d-sm-block my-3 mx-1">Home</Link>
                    {!isAuthenticated && <Link to={"/login"} className="btn btn-success d-lg-none my-3 mx-1">Login</Link>}

                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle ms-lg-2 me-4 fw-bold" href="www.google.com" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"><i
                                    className="fa-brands fa-slack fa-spin fa-lg me-2"></i>
                                Social Networks
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="https://www.facebook.com">
                                    <i className="fa-brands fa-facebook fa-beat me-2" style={{ color: "#2568ef" }}></i>Facebook</a>
                                </li>
                                <li><a className="dropdown-item" href="https://www.x.com">
                                    <i className="fa-brands fa-twitter fa-shake me-2" style={{ color: "#1da1f2" }}></i>Twitter</a></li>
                                <li><a className="dropdown-item" href="https://www.youtube.com">
                                    <i className="fa-brands fa-youtube fa-beat-fade me-2" style={{ color: "#ff0000" }}></i>Youtube</a></li>
                                <li><a className="dropdown-item" href="https://www.instagram.com">
                                    <i className="fa-brands fa-square-instagram fa-beat-fade me-2" style={{ color: "#ff7b00" }}></i>Instagram</a></li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item me-2" href="https://m.me/Muthu.AMMEW"><i
                                    className="fa-brands fa-facebook-messenger fa-shake fa-lg me-2" style={{ color: "#0080f7" }}></i>Chat(Via FB)</a></li>
                            </ul>
                        </li>
                    </ul>
                    <Search />

                    {!isAuthenticated && <Link to={"/login"} className="btn btn-success my-3 mx-1">Login</Link>}

                    {!isAuthenticated && <Link to={"/register"} className="btn btn-warning my-3 mx-1">Sign Up</Link>}
                    {isAuthenticated && <UserDropDown />}
                    {/*eslint-disable-next-line*/}
                    {isAuthenticated && <Link to={"/login"} className="nav-link d-flex flex-column mt-3 mx-3 align-items-start" onClick={logoutHandler}>
                        <div className=" d-flex flex-column align-items-center"><i className="fa-solid fa-arrow-right-from-bracket fa-xl mb-3" style={{ color: "#63E6BE" }}></i>
                            <h6>Logout</h6></div></Link>}

                    {isAuthenticated && <Link className="d-flex flex-column mx-3 mt-0 align-items-start" to={"/cart"}>

                        <div className=" d-flex flex-column align-items-center">
                            <h5 className="badge text-black mx-2 p-0">{cartItems.length}</h5>
                            <i className="fa-solid fa-cart-shopping fa-beat fa-xl mt-1" style={{ color: "#FFD43B" }}></i></div>
                    </Link>}
                    {/* <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link>
                    <span className="ml-1" id="cart_count">{cartItems.length}</span> */}
                    <Link to={"/home"} className="btn btn-danger d-block d-sm-none my-3 mx-1">Home</Link>
                </div>
            </div >
        </nav >
    )
}