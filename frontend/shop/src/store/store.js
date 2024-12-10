import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  itemReducer  from "./itemsSlice/itemSlice";
import  clientReducer  from "./clientSlice/clientSlice";
import  selectedReducer  from "./selectedSlice/selectedSlice";
import { api } from './api/api';

const reducers = combineReducers({
    cart: itemReducer,
    client: clientReducer,
    selected: selectedReducer,
    [api.reducerPath]: api.reducer,
})

export default configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});
