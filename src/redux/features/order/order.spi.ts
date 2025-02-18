import { TResponseRedux } from "../../../types/global.type";
import { IOrderResponse } from "../../../types/order.type";
import { baseApi } from "../../api/baseApi";

const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all orders (admin)
    allOrders: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<IOrderResponse[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    // Get single order by ID
    singleOrder: builder.query({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<IOrderResponse>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    // Get current user's orders
    myOrders: builder.query({
      query: () => ({
        url: `/orders/my-orders`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<IOrderResponse[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    // Create new order
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/orders`,
        method: "POST",
        body: data,
      }),
    }),

    // Update order status
    updateOrderStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),

    // Delete order
    deleteOrder: builder.mutation({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),

    // Verify payment
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllOrdersQuery,
  useSingleOrderQuery,
  useMyOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useVerifyOrderQuery,
} = OrderApi;
