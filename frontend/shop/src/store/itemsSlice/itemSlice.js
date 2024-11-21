import { createSlice } from "@reduxjs/toolkit";

const items = [];

export const itemSlice = createSlice({
    name: 'getItems',
    initialState: {
        value: items,
    },
    reducers: {
        // setItem: (state, { payload }) => {
        //     const {data} = useGetItemsQuery();
        //     data.map((item) => {
        //         var product = new Object(item);
        //         state.items.push(product);
        //     })
        //}
    }
});

// export const {actions, reducer} = userSlice;

export const { setItem } = itemSlice.actions;

export default itemSlice.reducer;
