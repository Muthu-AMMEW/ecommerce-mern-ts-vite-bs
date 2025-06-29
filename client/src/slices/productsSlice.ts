import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
    loading: false
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProductsError(state) {
            return {
                ...state,
                error: null
            }
        },
        productsRequest() {
            return {
                loading: true
            }
        },
        productsSuccess(action) {
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.count,
                resPerPage: action.payload.resPerPage
            }
        },
        productsFail(action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        adminProductsRequest() {
            return {
                loading: true
            }
        },
        adminProductsSuccess(action) {
            return {
                loading: false,
                products: action.payload.products,
            }
        },
        adminProductsFail(action) {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
});

export const {
    clearProductsError,
    productsRequest,
    productsSuccess,
    productsFail,
    adminProductsRequest,
    adminProductsSuccess,
    adminProductsFail

} = productsSlice.actions;

export default productsSlice.reducer;