import { createSlice } from "@reduxjs/toolkit";

const item = {
    id: '',
    name: '',
    cost: '',
    count: '',
    countUnit: ''
};

export const selectedSlice = createSlice({
    name: 'selected',
    initialState: {
        value: item,
    },
    reducers: {
        setSelectedItem: (state, { payload: item }) => {
            if (state.value.id === item.id) {
                state.value.id = '';
                state.value.name = '';
                state.value.cost = '';
                state.value.count = '';
                state.value.countUnit = '';
            }
            else { state.value = item; }
        },
        clearSelectedItem: (state) => {
            state.value.id = '';
            state.value.name = '';
            state.value.cost = '';
            state.value.count = '';
            state.value.countUnit = '';
        }
    }
});

export const { actions, reducer } = selectedSlice;

export default selectedSlice.reducer;
