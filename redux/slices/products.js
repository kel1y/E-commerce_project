import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const {VITE_SERVER_URL} = process.env

export const ProductApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_SERVER_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, limit }) => ({
        url: '/products',
        method: 'GET',
        params: { page, limit },
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({ url: `/products/${id}`, method: 'GET' }),
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = ProductApi;
