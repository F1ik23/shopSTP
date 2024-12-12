import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  { QUERY_URL }  from '../../config';
import { flattenObject  } from '../../services';


export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Items', 'Users', 'Orders'],
    baseQuery: fetchBaseQuery({
        baseUrl: QUERY_URL,
        mode: "cors",
        credentials: "same-origin", 
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            headers.set('Access-Control-Allow-Origin', '*');
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
        getClients: builder.query({
            query: () => '/clients/get',
            providesTags: () => [{
                type: 'Users'
            }]
        }),
        getOrders: builder.query({
            query: () => '/orders/get',
            providesTags: () => [{
                type: 'Orders'
            }],
            transformResponse: (response) => {
                if (Array.isArray(response)) {
                    return response.map(item => flattenObject(item));
                }
                return [];
            }
        }),
    }),
})

export const {
    useGetItemsQuery,
    useGetClientsQuery,
    useGetOrdersQuery
} = api;

