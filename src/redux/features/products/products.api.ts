import { TQueryParam, TResponseRedux } from "../../../types/global.type";
import { TProduct } from "../../../types/product.type";
import { baseApi } from "../../api/baseApi";

const ProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TProduct>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Products"],
    }),

    getSingleproduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllFProductsQuery,
  useGetSingleproductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductsApi;
