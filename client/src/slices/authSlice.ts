import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        authUser: {},
        isAuthenticated: false,
        error: null,
        isUpdated: false,
        isVerified: false,
        message: null
    },
    reducers: {
        clearAuthError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        clearIsUpdated(state, action) {
            return {
                ...state,
                isUpdated: false
            }
        },
        clearIsVerified(state, action) {
            return {
                ...state,
                isVerified: false
            }
        },
        clearMessage(state, action) {
            return {
                ...state,
                message: null
            }
        },
        registerRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        registerSuccess(state, action) {
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
        loginRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccess(state, action) {
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
        loadUserRequest(state, action) {
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            }
        },
        loadUserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                authUser: action.payload.user
            }
        },
        loadUserFail(state, action) {
            return {
                ...state,
                loading: false,
            }
        },
        logoutRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        logoutSuccess(state, action) {
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
        updateProfileRequest(state, action) {
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
        otpRequest(state, action) {
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
        emailVerifyRequest(state, action) {
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
        updatePasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updatePasswordSuccess(state, action) {
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
        forgotPasswordRequest(state, action) {
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
        resetPasswordRequest(state, action) {
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

