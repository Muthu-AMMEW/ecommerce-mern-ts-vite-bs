import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
    loading: false,
    user: {},
    users: [],
    error: null,
    isUserUpdated: false,
    isUserDeleted: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserError(state) {
            return {
                ...state,
                error: null
            }
        },
        clearIsUserUpdated(state) {
            return {
                ...state,
                isUserUpdated: false
            }
        },
        clearIsUserDeleted(state) {
            return {
                ...state,
                isUserDeleted: false
            }
        },
        usersRequest(state) {
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
        userRequest(state) {
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
        deleteUserRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        deleteUserSuccess(state) {
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
        updateUserRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        updateUserSuccess(state) {
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
