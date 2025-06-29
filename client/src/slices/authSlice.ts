import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
    loading: false,
    authUser: {},
    isAuthenticated: false,
    error: null,
    isUpdated: false,
    isVerified: false,
    message: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthError(state) {
            return {
                ...state,
                error: null
            }
        },
        clearIsUpdated(state) {
            return {
                ...state,
                isUpdated: false
            }
        },
        clearIsVerified(state) {
            return {
                ...state,
                isVerified: false
            }
        },
        clearMessage(state) {
            return {
                ...state,
                message: null
            }
        },
        registerRequest(state) {
            return {
                ...state,
                loading: true,
            }
        },
        registerSuccess(action) {
            return {
                loading: false,
                isAuthenticated: true,
                authUser: action.payload.user
            }
        },
        registerFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loginRequest(state) {
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccess(action) {
            return {
                loading: false,
                isAuthenticated: true,
                authUser: action.payload.user
            }
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loadUserRequest(state) {
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            }
        },
        loadUserSuccess(action) {
            return {
                loading: false,
                isAuthenticated: true,
                authUser: action.payload.user
            }
        },
        loadUserFail(state) {
            return {
                ...state,
                loading: false,
            }
        },
        logoutRequest(state) {
            return {
                ...state,
                loading: true,
            }
        },
        logoutSuccess() {
            return {
                loading: false,
                isAuthenticated: false,
            }
        },
        logoutFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateProfileRequest(state) {
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updateProfileSuccess(state, action) {
            return {
                ...state,
                loading: false,
                authUser: action.payload.user,
                isUpdated: true
            }
        },
        updateProfileFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        otpRequest(state) {
            return {
                ...state,
                loading: true,
                message: null

            }
        },
        otpSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }
        },
        otpFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        emailVerifyRequest(state) {
            return {
                ...state,
                loading: true,
                isVerified: false
            }
        },
        emailVerifySuccess(state, action) {
            return {
                ...state,
                loading: false,
                authUser: action.payload.user,
                isVerified: true
            }
        },
        emailVerifyFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updatePasswordRequest(state) {
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updatePasswordSuccess(state) {
            return {
                ...state,
                loading: false,
                isUpdated: true
            }
        },
        updatePasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        forgotPasswordRequest(state) {
            return {
                ...state,
                loading: true,
                message: null
            }
        },
        forgotPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }
        },
        forgotPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        resetPasswordRequest(state) {
            return {
                ...state,
                loading: true,
            }
        },
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                authUser: action.payload.user
            }
        },
        resetPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

    }
});

export const {
    clearAuthError,
    clearIsUpdated,
    clearIsVerified,
    clearMessage,
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
} = authSlice.actions;

export default authSlice.reducer;

