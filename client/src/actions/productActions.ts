import axios from 'axios';
import {
    productsRequest,
    productsSuccess,
    productsFail,
    adminProductsRequest,
    adminProductsSuccess,
    adminProductsFail
} from '../slices/productsSlice';

import {
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
} from '../slices/productSlice';
import { AppDispatch } from '../store';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export const getProducts = (keyword: string | null, price: number[] | null, category: string | null, rating: number | null, currentPage: number) => async (dispatch: AppDispatch) => {

    try {
        dispatch(productsRequest())
        let link = `/products?page=${currentPage}`;

        if (keyword) {
            link += `&keyword=${keyword}`
        }
        if (price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if (category) {
            link += `&category=${category}`
        }
        if (rating) {
            link += `&ratings=${rating}`
        }

        const { data } = await axios.get(link);
        dispatch(productsSuccess(data))
    } catch (error) {
        dispatch(productsFail(extractErrorMessage(error)))
    }

}


export const getProduct = (id: string) => async (dispatch: AppDispatch) => {

    try {
        dispatch(productRequest())
        const { data } = await axios.get(`/product/${id}`);
        dispatch(productSuccess(data))
    } catch (error) {
        dispatch(productFail(extractErrorMessage(error)))
    }

}

export const createReview = (reviewData: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(createReviewRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/review`, reviewData, config);
        dispatch(createReviewSuccess(data))
    } catch (error) {

        dispatch(createReviewFail(extractErrorMessage(error)))
    }

}

export const getAdminProducts = async (dispatch: AppDispatch) => {

    try {
        dispatch(adminProductsRequest())
        const { data } = await axios.get(`/admin/products`);
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        dispatch(adminProductsFail(extractErrorMessage(error)))
    }

}

export const createNewProduct = (productData: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(newProductRequest())
        const { data } = await axios.post(`/admin/product/new`, productData);
        dispatch(newProductSuccess(data))
    } catch (error) {
        dispatch(newProductFail(extractErrorMessage(error)))
    }

}

export const deleteProduct = (id: string) => async (dispatch: AppDispatch) => {

    try {
        dispatch(deleteProductRequest())
        await axios.delete(`/admin/product/${id}`);
        dispatch(deleteProductSuccess())
    } catch (error) {
        dispatch(deleteProductFail(extractErrorMessage(error)))
    }

}

export const updateProduct = (id: string, productData: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(updateProductRequest())
        const { data } = await axios.put(`/admin/product/${id}`, productData);
        dispatch(updateProductSuccess(data))
    } catch (error) {
        dispatch(updateProductFail(extractErrorMessage(error)))
    }

}


export const getReviews = (id: string) => async (dispatch: AppDispatch) => {

    try {
        dispatch(reviewsRequest())
        const { data } = await axios.get(`/admin/reviews`, { params: { id } });
        dispatch(reviewsSuccess(data))
    } catch (error) {
        dispatch(reviewsFail(extractErrorMessage(error)))
    }

}

export const deleteReview = (productId: string, id: string) => async (dispatch: AppDispatch) => {

    try {
        dispatch(deleteReviewRequest())
        await axios.delete(`/admin/review`, { params: { productId, id } });
        dispatch(deleteReviewSuccess())
    } catch (error) {
        dispatch(deleteReviewFail(extractErrorMessage(error)))
    }

}