import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: 'cart',
    initialState: [
    ],
    reducers: {
        addCount(state, action) {
            const item = state.find((a) => a.id === action.payload.id);
            if (item) {
                item.count++;
            }
        },
        minusCount(state, action) {
            const item = state.find((a) => a.id === action.payload.id);
            if (item && item.count > 0) {
                item.count--;
            }
        },
        addCartItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.find((item) => item.id === newItem.id);

            if (existingItem) {
                existingItem.count++;
            } else {
                state.push(newItem);
            }
        },          
        removeCartItem(state, action) {
            const id = action.payload;
            const index = state.findIndex(item => item.id === id);
            if (index >= 0) {
                state.splice(index, 1);
            }
        }

    }
});



export let { addCount, minusCount, addCartItem, removeCartItem } = cart.actions;
export default cart;