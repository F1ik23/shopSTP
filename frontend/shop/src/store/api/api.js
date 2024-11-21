import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  { QUERY_URL }  from '../../config';

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Items', 'Users', 'Orders'],
    baseQuery: fetchBaseQuery({
        baseUrl: QUERY_URL,
        credentials: 'same-origin',
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    endpoints: builder => ({
        getItems: builder.query({
            query: () => '/items/get',
            providesTags: () => [{
                type: 'Items'
            }]
        }),
    }),
})

export const {
    useGetItemsQuery
} = api;

