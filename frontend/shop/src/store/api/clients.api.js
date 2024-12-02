import { api } from "./api";


export const clientApi = api.injectEndpoints({
    endpoints: builder => ({
        setClient: builder.mutation({
            query: (body) => ({
                url: '/clients/set',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }),
            invalidatesTags: () => [{
                type: 'Users',
            }]
        }),

        getAllClients: builder.query({
            query: () => '/clients/get',
            invalidatesTags: [{
                type: 'Users'
            }]
        })
        
    })
})