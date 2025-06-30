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
import { extractErrorMessage } from '../utils/extractErrorMessage';

export const createOrder = (order: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createOrderRequest())
        const { data } = await axios.post(`/order/new`, order)
        dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(extractErrorMessage(error)))
    }
}
export const userOrders = async (dispatch: AppDispatch) => {
    try {
        dispatch(userOrdersRequest())
        const { data } = await axios.get(`/myorders`)
        dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(extractErrorMessage(error)))
    }
}
export const orderDetail = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(orderDetailRequest())
        const { data } = await axios.get(`/order/${id}`)
        dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(extractErrorMessage(error)))
    }
}

export const adminOrders = async (dispatch: AppDispatch) => {
    try {
        dispatch(adminOrdersRequest())
        const { data } = await axios.get(`/admin/orders`)
        dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(extractErrorMessage(error)))
    }
}

export const deleteOrder = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteOrderRequest())
        await axios.delete(`/admin/order/${id}`)
        dispatch(deleteOrderSuccess())
    } catch (error) {
        dispatch(deleteOrderFail(extractErrorMessage(error)))
    }
}

export const updateOrder = (id: string, orderData: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateOrderRequest())
        const { data } = await axios.put(`/admin/order/${id}`, orderData)
        dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(extractErrorMessage(error)))
    }
}

export const cancelOrder = (id: string, orderData: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateOrderRequest())
        const { data } = await axios.put(`/order/${id}`, orderData)
        dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(extractErrorMessage(error)))
    }
}