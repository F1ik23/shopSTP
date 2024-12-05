import { api } from "./api";


export const itemsApi = api.injectEndpoints({
    endpoints: builder => ({
        setItem: builder.mutation({
            query: (body) => ({
                url: '/items/set',
                method: 'POST',
                body: body,
                mode: 'cors'
            }),
            invalidatesTags: () => [{
                type: 'Items',
            }],
        }),
        deleteItem: builder.mutation({
            query: (body) => ({
                url: '/items/delete',
                method: 'DELETE',
                body: body,
                mode: 'cors'
            }),
            invalidatesTags: () => [{
                type: 'Items',
            }],
        })
    })
})

export const {useSetItemMutation, useDeleteItemMutation} = itemsApi;
