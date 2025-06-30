import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : [],
    loading: false,
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')!) : {}
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItemRequest(state) {
            state.loading = true;
        },

        addCartItemSuccess(state, action: PayloadAction<any>) {
            const item = action.payload;
            const isItemExist = state.cartItems.find((i: any) => i._id === item._id);

            if (isItemExist) {
                // If item exists, update it
                state.cartItems = state.cartItems.map((i: any) =>
                    i._id === item._id ? item : i
                );
            } else {
                state.cartItems.push(item);
            }

            state.loading = false;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        increaseCartItemQty(state, action: PayloadAction<any>) {
            state.cartItems = state.cartItems.map((item: any) => {
                if (item._id === action.payload) {
                    item.quantity += 1;
                }
                return item;
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        decreaseCartItemQty(state, action: PayloadAction<any>) {
            state.cartItems = state.cartItems.map((item: any) => {
                if (item._id === action.payload) {
                    item.quantity -= 1;
                }
                return item;
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        removeItemFromCart(state, action: PayloadAction<any>) {
            state.cartItems = state.cartItems.filter((item: any) => item._id !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        saveShippingInfo(state, action: PayloadAction<any>) {
            state.shippingInfo = action.payload;
            localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo));
        },

        orderCompleted(state) {
            state.cartItems = [];
            state.shippingInfo = {};
            state.loading = false;

            localStorage.removeItem('cartItems');
            localStorage.removeItem('shippingInfo');
            sessionStorage.removeItem('orderInfo');
        }
    }
});

export const {
    addCartItemRequest,
    addCartItemSuccess,
    decreaseCartItemQty,
    increaseCartItemQty,
    removeItemFromCart,
    saveShippingInfo,
    orderCompleted
} = cartSlice.actions;

export default cartSlice.reducer;
