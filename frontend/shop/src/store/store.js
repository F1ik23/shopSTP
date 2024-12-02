import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  itemReducer  from "./itemsSlice/itemSlice";
import { api } from './api/api';

const reducers = combineReducers({
    items: itemReducer,
    [api.reducerPath]: api.reducer,
})

export default configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});
