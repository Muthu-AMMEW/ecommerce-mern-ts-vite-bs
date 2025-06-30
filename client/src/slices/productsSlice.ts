import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    loading: false,
    error: null,
    products: [],
    productsCount: 0,
    resPerPage: 0
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProductsError(state) {
            state.error = null;
        },

        productsRequest(state) {
            state.loading = true;
        },

        productsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.count;
            state.resPerPage = action.payload.resPerPage;
        },

        productsFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        adminProductsRequest(state) {
            state.loading = true;
        },

        adminProductsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.products = action.payload.products;
        },

        adminProductsFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
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
