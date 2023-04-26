import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
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
        }
    }
})


export let { addCount, minusCount } = cart.actions;
export default cart;