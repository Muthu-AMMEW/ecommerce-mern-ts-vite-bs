import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

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
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearProduct(state, action) {
            return {
                ...state,
                product: {}
            }
        },
        clearProductError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        clearIsProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        },
        clearIsProductUpdated(state, action) {
            return {
                ...state,
                isProductUpdated: false
            }
        },
        clearIsProductDeleted(state, action) {
            return {
                ...state,
                isProductDeleted: false
            }
        },
        clearIsReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },
        clearIsReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
            }
        },
        productRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        productSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        productFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        createReviewRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        createReviewSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true
            }
        },
        createReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        newProductRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        newProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated: true
            }
        },
        newProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductCreated: false
            }
        },
        deleteProductRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isProductDeleted: true
            }
        },
        deleteProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        updateProductRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true
            }
        },
        updateProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        reviewsRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        reviewsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews
            }
        },
        reviewsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteReviewRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteReviewSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewDeleted: true
            }
        },
        deleteReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
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
