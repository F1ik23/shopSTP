import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  { QUERY_URL }  from '../../config';

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Items', 'Users', 'Orders'],
    baseQuery: fetchBaseQuery({
        baseUrl: QUERY_URL,
        credentials: 'include'
    }),
    endpoints: builder => ({
        getItems: builder.query({
            query: (params) => `/get-items`,
            providesTags: () => [{
                type: 'Items'
            }]
        }),
    }),
})

export const {
    useGetItemsQuery
} = api;

