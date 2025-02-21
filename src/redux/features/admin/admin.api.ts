/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const AdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    /* block user */
    blockUser: builder.mutation({
      query: ({ userId, isBlocked }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: { isBlocked }, // { isBlocked: true }
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useBlockUserMutation } = AdminApi;
