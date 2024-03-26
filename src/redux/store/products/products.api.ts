import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./../../../types";

export const productApi = createApi({
  reducerPath: 'api/products',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:80/api/'
  }),
  endpoints: (build) => ({
    getProducts: build.query<Product[], number>({
      query: () => 'products',
      transformResponse: (response: Product[]) => {
        return response.map((product) => ({
          ...product,
          quantity: 1,
        }));
      },
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
