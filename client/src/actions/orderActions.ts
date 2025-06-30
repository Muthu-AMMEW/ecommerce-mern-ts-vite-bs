import {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    userOrdersRequest,
    userOrdersSuccess,
    userOrdersFail,
    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    adminOrdersFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFail
} from '../slices/orderSlice';
import axios from 'axios';
import { AppDispatch } from '../store';

export const createOrder = order => async (dispatch: AppDispatch) => {
    try {
        dispatch(createOrderRequest())
        const { data } = await axios.post(`/order/new`, order)
        dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}
export const userOrders = async (dispatch: AppDispatch) => {
    try {
        dispatch(userOrdersRequest())
        const { data } = await axios.get(`/myorders`)
        dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}
export const orderDetail = id => async (dispatch: AppDispatch) => {
    try {
        dispatch(orderDetailRequest())
        const { data } = await axios.get(`/order/${id}`)
        dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}

export const adminOrders = async (dispatch: AppDispatch) => {
    try {
        dispatch(adminOrdersRequest())
        const { data } = await axios.get(`/admin/orders`)
        dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
    }
}

export const deleteOrder = id => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteOrderRequest())
        await axios.delete(`/admin/order/${id}`)
        dispatch(deleteOrderSuccess())
    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message))
    }
}

export const updateOrder = (id, orderData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateOrderRequest())
        const { data } = await axios.put(`/admin/order/${id}`, orderData)
        dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message))
    }
}

export const cancelOrder = (id, orderData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateOrderRequest())
        const { data } = await axios.put(`/order/${id}`, orderData)
        dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message))
    }
}