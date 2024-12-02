import { createSlice } from "@reduxjs/toolkit";

const item = {
    id: '',
    name: '',
    cost: '',
    count: '',
    countUnit: ''
};

export const itemSlice = createSlice({
    name: 'items',
    initialState: {
        value: item,
    },
    reducers: {
        setItem: (state, { payload: item }) => {
            if (state.value.id === item.id) {
                state.value.id = '';
                state.value.name = '';
                state.value.cost = '';
                state.value.count = '';
                state.value.countUnit = '';
            }
            else { state.value = item; }
            console.log(item);
        }
    }
});

// export const {actions, reducer} = userSlice;

export const { actions, reducer } = itemSlice;

export default itemSlice.reducer;
