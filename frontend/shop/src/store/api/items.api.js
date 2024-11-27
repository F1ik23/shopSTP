import { api } from "./api";


export const itemsApi = api.injectEndpoints({
    endpoints: builder => ({
        setItem: builder.mutation({
            query: (body) => ({
                url: '/items/set',
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }),
            invalidatesTags: () => [{
                type: 'Items',
            }]
        }),

    })
})

export const {useSetItemMutation} = itemsApi;
