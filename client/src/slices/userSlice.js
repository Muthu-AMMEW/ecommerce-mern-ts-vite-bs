import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: {},
        users: [],
        error: null,
        isUserUpdated: false,
        isUserDeleted: false
    },
    reducers: {
        clearUserError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        clearIsUserUpdated(state, action) {
            return {
                ...state,
                isUserUpdated: false
            }
        },
        clearIsUserDeleted(state, action) {
            return {
                ...state,
                isUserDeleted: false
            }
        },
        usersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        usersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                users: action.payload.users,
            }
        },
        usersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
            }
        },
        userFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteUserRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserDeleted: true
            }
        },
        deleteUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateUserRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserUpdated: true
            }
        },
        updateUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
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
