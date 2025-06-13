import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetail: {},
        newOrderDetail: {},
        userOrders: [],
        adminOrders: [],
        loading: false,
        isOrderDeleted: false,
        isOrderUpdated: false,
        error: null
    },
    reducers: {
        clearNewOrder(state, action) {
            return {
                ...state,
                newOrderDetail: {}
            }
        },
        clearOrderError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        clearIsOrderDeleted(state, action) {
            return {
                ...state,
                isOrderDeleted: false
            }
        },
        clearIsOrderUpdated(state, action) {
            return {
                ...state,
                isOrderUpdated: false
            }
        },
        createOrderRequest(state, action) {
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
        userOrdersRequest(state, action) {
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
        orderDetailRequest(state, action) {
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
        adminOrdersRequest(state, action) {
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

        deleteOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteOrderSuccess(state, action) {
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
        updateOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateOrderSuccess(state, action) {
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
