import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    loading: false,
    user: {},
    users: [],
    error: null,
    isUserUpdated: false,
    isUserDeleted: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserError(state) {
            state.error = null;
        },
        clearIsUserUpdated(state) {
            state.isUserUpdated = false;
        },
        clearIsUserDeleted(state) {
            state.isUserDeleted = false;
        },

        usersRequest(state) {
            state.loading = true;
        },
        usersSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.users = action.payload.users;
        },
        usersFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        userRequest(state) {
            state.loading = true;
        },
        userSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.user = action.payload.user;
        },
        userFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        deleteUserRequest(state) {
            state.loading = true;
        },
        deleteUserSuccess(state) {
            state.loading = false;
            state.isUserDeleted = true;
        },
        deleteUserFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        updateUserRequest(state) {
            state.loading = true;
        },
        updateUserSuccess(state) {
            state.loading = false;
            state.isUserUpdated = true;
        },
        updateUserFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    clearUserError,
    clearIsUserUpdated,
    clearIsUserDeleted,
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
} = userSlice.actions;

export default userSlice.reducer;
