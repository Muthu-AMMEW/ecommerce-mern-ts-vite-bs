import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : [],
    loading: false,
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')!) : {}
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItemRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        addCartItemSuccess(state, action) {
            const item = action.payload

            const isItemExist = state.cartItems.find(i => i._id == item._id);

            if (isItemExist) {
                state = {
                    ...state,
                    loading: false,
                }
            } else {
                state = {
                    cartItems: [...state.cartItems, item],
                    loading: false
                }

                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
            return state

        },
        increaseCartItemQty(state, action) {
            state.cartItems = state.cartItems.map(item => {
                if (item._id == action.payload) {
                    item.quantity = item.quantity + 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

        },
        decreaseCartItemQty(state, action) {
            state.cartItems = state.cartItems.map(item => {
                if (item._id == action.payload) {
                    item.quantity = item.quantity - 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

        },
        removeItemFromCart(state, action) {
            const filterItems = state.cartItems.filter(item => {
                return item._id !== action.payload
            })
            localStorage.setItem('cartItems', JSON.stringify(filterItems));
            return {
                ...state,
                cartItems: filterItems
            }
        },
        saveShippingInfo(state, action) {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
            return {
                ...state,
                shippingInfo: action.payload
            }
        },
        orderCompleted() {
            localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('orderInfo');
            return {
                cartItems: [],
                loading: false,
                shippingInfo: {}
            }
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