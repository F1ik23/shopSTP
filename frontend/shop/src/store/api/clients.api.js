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

        getClients: builder.query({
            query: () => '/clients/get',
            invalidatesTags: [{
                type: 'Users'
            }]
        })
        
    })
})

export const {useGetClientsQuery, useSetClientMutation} = clientApi;