import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    loading: false,
    error: null,
    product: {},
    isProductCreated: false,
    isProductUpdated: false,
    isProductDeleted: false,
    isReviewSubmitted: false,
    isReviewDeleted: false,
    reviews: []
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearProduct(state) {
            state.product = {};
        },
        clearProductError(state) {
            state.error = null;
        },
        clearIsProductCreated(state) {
            state.isProductCreated = false;
        },
        clearIsProductUpdated(state) {
            state.isProductUpdated = false;
        },
        clearIsProductDeleted(state) {
            state.isProductDeleted = false;
        },
        clearIsReviewSubmitted(state) {
            state.isReviewSubmitted = false;
        },
        clearIsReviewDeleted(state) {
            state.isReviewDeleted = false;
        },

        productRequest(state) {
            state.loading = true;
        },
        productSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.product = action.payload.product;
        },
        productFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        createReviewRequest(state) {
            state.loading = true;
        },
        createReviewSuccess(state) {
            state.loading = false;
            state.isReviewSubmitted = true;
        },
        createReviewFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        newProductRequest(state) {
            state.loading = true;
        },
        newProductSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.product = action.payload.product;
            state.isProductCreated = true;
        },
        newProductFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
            state.isProductCreated = false;
        },

        deleteProductRequest(state) {
            state.loading = true;
        },
        deleteProductSuccess(state) {
            state.loading = false;
            state.isProductDeleted = true;
        },
        deleteProductFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        updateProductRequest(state) {
            state.loading = true;
        },
        updateProductSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.product = action.payload.product;
            state.isProductUpdated = true;
        },
        updateProductFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        reviewsRequest(state) {
            state.loading = true;
        },
        reviewsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.reviews = action.payload.reviews;
        },
        reviewsFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        deleteReviewRequest(state) {
            state.loading = true;
        },
        deleteReviewSuccess(state) {
            state.loading = false;
            state.isReviewDeleted = true;
        },
        deleteReviewFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    clearProductError,
    clearProduct,
    clearIsProductCreated,
    clearIsProductUpdated,
    clearIsProductDeleted,
    clearIsReviewSubmitted,
    clearIsReviewDeleted,
    productRequest,
    productSuccess,
    productFail,
    createReviewRequest,
    createReviewSuccess,
    createReviewFail,
    newProductRequest,
    newProductSuccess,
    newProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    updateProductRequest,
    updateProductSuccess,
    updateProductFail,
    reviewsRequest,
    reviewsSuccess,
    reviewsFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail
} = productSlice.actions;

export default productSlice.reducer;
