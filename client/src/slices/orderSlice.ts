import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
    orderDetail: {},
    newOrderDetail: {},
    userOrders: [],
    adminOrders: [],
    loading: false,
    isOrderDeleted: false,
    isOrderUpdated: false,
    error: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearNewOrder(state) {
            return {
                ...state,
                newOrderDetail: {}
            }
        },
        clearOrderError(state) {
            return {
                ...state,
                error: null
            }
        },
        clearIsOrderDeleted(state) {
            return {
                ...state,
                isOrderDeleted: false
            }
        },
        clearIsOrderUpdated(state) {
            return {
                ...state,
                isOrderUpdated: false
            }
        },
        createOrderRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        createOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                newOrderDetail: action.payload.order
            }
        },
        createOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userOrdersRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        userOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userOrders: action.payload.orders
            }
        },
        userOrdersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        orderDetailRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        orderDetailSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload.order
            }
        },
        orderDetailFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        adminOrdersRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        adminOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminOrders: action.payload.orders
            }
        },
        adminOrdersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        deleteOrderRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        deleteOrderSuccess(state) {
            return {
                ...state,
                loading: false,
                isOrderDeleted: true
            }
        },
        deleteOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateOrderRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        updateOrderSuccess(state) {
            return {
                ...state,
                loading: false,
                isOrderUpdated: true
            }
        },
        updateOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
});

export const {
    clearOrderError,
    clearNewOrder,
    clearIsOrderDeleted,
    clearIsOrderUpdated,
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
} = orderSlice.actions;

export default orderSlice.reducer;
