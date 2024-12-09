import { api } from "./api";


export const orderApi = api.injectEndpoints({
    endpoints: builder => ({
        setOrder: builder.mutation({
            query: (body) => ({
                url: '/orders/set',
                method: 'POST',
                body: body,
                mode: 'cors'
            }),
            invalidatesTags: () => [{
                type: 'Orders',
            }],
        }),
        deleteOrder: builder.mutation({
            query: (body) => ({
                url: '/orders/delete',
                method: 'DELETE',
                body: body,
                mode: 'cors'
            }),
            invalidatesTags: () => [{
                type: 'Orders',
            }],
        })
    })
})

export const {useDeleteOrderMutation, useSetOrderMutation} = orderApi;
