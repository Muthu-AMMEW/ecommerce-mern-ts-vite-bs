import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    loading: false,
    authUser: {},
    isAuthenticated: false,
    error: null,
    isUpdated: false,
    isVerified: false,
    message: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthError(state) {
            state.error = null;
        },
        clearIsUpdated(state) {
            state.isUpdated = false;
        },
        clearIsVerified(state) {
            state.isVerified = false;
        },
        clearMessage(state) {
            state.message = null;
        },

        registerRequest(state) {
            state.loading = true;
        },
        registerSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.isAuthenticated = true;
            state.authUser = action.payload.user;
        },
        registerFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        loginRequest(state) {
            state.loading = true;
        },
        loginSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.isAuthenticated = true;
            state.authUser = action.payload.user;
        },
        loginFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        loadUserRequest(state) {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loadUserSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.isAuthenticated = true;
            state.authUser = action.payload.user;
        },
        loadUserFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        logoutRequest(state) {
            state.loading = true;
        },
        logoutSuccess(state) {
            state.loading = false;
            state.isAuthenticated = false;
            state.authUser = {};
        },
        logoutFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        updateProfileRequest(state) {
            state.loading = true;
            state.isUpdated = false;
        },
        updateProfileSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.authUser = action.payload.user;
            state.isUpdated = true;
        },
        updateProfileFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        otpRequest(state) {
            state.loading = true;
            state.message = null;
        },
        otpSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.message = action.payload.message;
        },
        otpFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        emailVerifyRequest(state) {
            state.loading = true;
            state.isVerified = false;
        },
        emailVerifySuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.authUser = action.payload.user;
            state.isVerified = true;
        },
        emailVerifyFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        updatePasswordRequest(state) {
            state.loading = true;
            state.isUpdated = false;
        },
        updatePasswordSuccess(state) {
            state.loading = false;
            state.isUpdated = true;
        },
        updatePasswordFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        forgotPasswordRequest(state) {
            state.loading = true;
            state.message = null;
        },
        forgotPasswordSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.message = action.payload.message;
        },
        forgotPasswordFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        resetPasswordRequest(state) {
            state.loading = true;
        },
        resetPasswordSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.isAuthenticated = true;
            state.authUser = action.payload.user;
        },
        resetPasswordFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        }
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
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} = authSlice.actions;

export default authSlice.reducer;
