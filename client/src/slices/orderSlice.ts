import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    orderDetail: {},
    newOrderDetail: {},
    userOrders: [],
    adminOrders: [],
    loading: false,
    isOrderDeleted: false,
    isOrderUpdated: false,
    error: null
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearNewOrder(state) {
            state.newOrderDetail = {};
        },
        clearOrderError(state) {
            state.error = null;
        },
        clearIsOrderDeleted(state) {
            state.isOrderDeleted = false;
        },
        clearIsOrderUpdated(state) {
            state.isOrderUpdated = false;
        },

        createOrderRequest(state) {
            state.loading = true;
        },
        createOrderSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.newOrderDetail = action.payload.order;
        },
        createOrderFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        userOrdersRequest(state) {
            state.loading = true;
        },
        userOrdersSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.userOrders = action.payload.orders;
        },
        userOrdersFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        orderDetailRequest(state) {
            state.loading = true;
        },
        orderDetailSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.orderDetail = action.payload.order;
        },
        orderDetailFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        adminOrdersRequest(state) {
            state.loading = true;
        },
        adminOrdersSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.adminOrders = action.payload.orders;
        },
        adminOrdersFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        deleteOrderRequest(state) {
            state.loading = true;
        },
        deleteOrderSuccess(state) {
            state.loading = false;
            state.isOrderDeleted = true;
        },
        deleteOrderFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },

        updateOrderRequest(state) {
            state.loading = true;
        },
        updateOrderSuccess(state) {
            state.loading = false;
            state.isOrderUpdated = true;
        },
        updateOrderFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
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
