import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const itemSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCartItem: (state, { payload: item }) => {
            const isExists = state.some (r => r.id === item.id)
            if(isExists) {
                const index = state.findIndex(items => items.id === item.id)
                if (index !== -1) {
                    state.splice(index, 1);
                }
            }
            else
                state.push(item)
        },
        clearCart: (state) => {
            state.length = 0;
        }
    }
});

export const { actions, reducer } = itemSlice;

export default itemSlice.reducer;
