import { api } from "./api";


export const clientApi = api.injectEndpoints({
    endpoints: builder => ({
        setClient: builder.mutation({
            query: (body) => ({
                url: '/clients/set',
                body: body,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            }),
            invalidatesTags: () => [{
                type: 'Users',
            }]
        }),
        deleteClient: builder.mutation({
            query: (body) => ({
                url: '/clients/delete',
                method: 'DELETE',
                body: body,
                mode: 'cors'
            }),
            invalidatesTags: () => [{
                type: 'Users',
            }],
        }),
        getRandomClient: builder.query({
            query: () => '/clients/random',
        })
    })
})

export const {useSetClientMutation, useDeleteClientMutation, useGetRandomClientQuery} = clientApi;