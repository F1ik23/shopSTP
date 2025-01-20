import { createSlice } from "@reduxjs/toolkit";

const client = {
    id: '',
    name: ''
};

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        value: client,
    },
    reducers: {
        createClient: (state, { payload: data }) => {
            if (data !== undefined) {
                state.value.id = data.id;
                state.value.name = data.name;
            }
        }
    }
});

export const { actions, reducer } = clientSlice;

export default clientSlice.reducer;
