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
        //handle error
        dispatch(productsFail(error.response.data.message))
    }

}


export const getProduct = id => async (dispatch: AppDispatch) => {

    try {
        dispatch(productRequest())
        const { data } = await axios.get(`/product/${id}`);
        dispatch(productSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productFail(error.response.data.message))
    }

}

export const createReview = reviewData => async (dispatch: AppDispatch) => {

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
        //handle error
        dispatch(createReviewFail(error.response.data.message))
    }

}

export const getAdminProducts = async (dispatch: AppDispatch) => {

    try {
        dispatch(adminProductsRequest())
        const { data } = await axios.get(`/admin/products`);
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.response.data.message))
    }

}

export const createNewProduct = productData => async (dispatch: AppDispatch) => {

    try {
        dispatch(newProductRequest())
        const { data } = await axios.post(`/admin/product/new`, productData);
        dispatch(newProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(newProductFail(error.response.data.message))
    }

}

export const deleteProduct = id => async (dispatch: AppDispatch) => {

    try {
        dispatch(deleteProductRequest())
        await axios.delete(`/admin/product/${id}`);
        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message))
    }

}

export const updateProduct = (id, productData) => async (dispatch: AppDispatch) => {

    try {
        dispatch(updateProductRequest())
        const { data } = await axios.put(`/admin/product/${id}`, productData);
        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message))
    }

}


export const getReviews = id => async (dispatch: AppDispatch) => {

    try {
        dispatch(reviewsRequest())
        const { data } = await axios.get(`/admin/reviews`, { params: { id } });
        dispatch(reviewsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(reviewsFail(error.response.data.message))
    }

}

export const deleteReview = (productId, id) => async (dispatch: AppDispatch) => {

    try {
        dispatch(deleteReviewRequest())
        await axios.delete(`/admin/review`, { params: { productId, id } });
        dispatch(deleteReviewSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteReviewFail(error.response.data.message))
    }

}