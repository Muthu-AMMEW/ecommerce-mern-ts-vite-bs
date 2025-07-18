import { toast } from 'react-toastify';
import {
    registerRequest,
    registerSuccess,
    registerFail,
    loginRequest,
    loginSuccess,
    loginFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutRequest,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    otpRequest,
    otpSuccess,
    otpFail,
    emailVerifyRequest,
    emailVerifySuccess,
    emailVerifyFail,
    updatePasswordFail,
    updatePasswordSuccess,
    updatePasswordRequest,
    forgotPasswordFail,
    forgotPasswordSuccess,
    forgotPasswordRequest,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess
} from '../slices/authSlice';

import {
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail
} from '../slices/userSlice'

import axios from 'axios';
import { AppDispatch } from '../store';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {

    try {
        dispatch(loginRequest())
        const { data } = await axios.post(`/login`, { email, password });
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(extractErrorMessage(error)))
    }

}

export const register = (userData: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`/register`, userData, config);
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(extractErrorMessage(error)))
    }

}

export const loadUser = async (dispatch: AppDispatch) => {

    try {
        dispatch(loadUserRequest())
        const { data } = await axios.get(`/myprofile`);
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(extractErrorMessage(error)))
    }

}

export const logout = async (dispatch: AppDispatch) => {

    try {
        dispatch(logoutRequest())
        await axios.get(`/logout`);
        localStorage.clear();
        sessionStorage.clear();
        dispatch(logoutSuccess());

        // Redirect + refresh + remove previous history
        window.location.replace('/login');
    } catch (error) {
        dispatch(logoutFail(extractErrorMessage(error)))
        toast.error(extractErrorMessage(error), { position: 'top-center' })
    }

}

export const updateProfile = (userData: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/update`, userData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(extractErrorMessage(error)))
    }

}


export const generateOtp = (userData: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(otpRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`/email/generate-otp`, userData, config);
        dispatch(otpSuccess(data))
    } catch (error) {
        dispatch(otpFail(extractErrorMessage(error)))
    }

}

export const verifyEmail = (userData: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(emailVerifyRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.put(`/email/verify-otp`, userData, config);
        dispatch(emailVerifySuccess(data))
    } catch (error) {
        dispatch(emailVerifyFail(extractErrorMessage(error)))
    }

}

export const updatePassword = (formData: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(updatePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        await axios.put(`/password/change`, formData, config);
        dispatch(updatePasswordSuccess())
    } catch (error) {
        dispatch(updatePasswordFail(extractErrorMessage(error)))
    }

}

export const forgotPassword = (formData: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`/password/forgot`, formData, config);
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(extractErrorMessage(error)))
    }

}

export const resetPassword = (formData: any, token: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(extractErrorMessage(error)))
    }

}

export const getUsers = async (dispatch: AppDispatch) => {

    try {
        dispatch(usersRequest())
        const { data } = await axios.get(`/admin/users`);
        dispatch(usersSuccess(data))
    } catch (error) {
        dispatch(usersFail(extractErrorMessage(error)))
    }

}

export const getUser = (id: string) => async (dispatch: AppDispatch) => {

    try {
        dispatch(userRequest())
        const { data } = await axios.get(`/admin/user/${id}`);
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(extractErrorMessage(error)))
    }

}

export const deleteUser = (id: string) => async (dispatch: AppDispatch) => {

    try {
        dispatch(deleteUserRequest())
        await axios.delete(`/admin/user/${id}`);
        dispatch(deleteUserSuccess())
    } catch (error) {
        dispatch(deleteUserFail(extractErrorMessage(error)))
    }

}

export const updateUser = (id: string, formData: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(updateUserRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        await axios.put(`/admin/user/${id}`, formData, config);
        dispatch(updateUserSuccess())
    } catch (error) {
        dispatch(updateUserFail(extractErrorMessage(error)))
    }

}