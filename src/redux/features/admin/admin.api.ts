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
      query: ({ id, updates }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: updates,
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useBlockUserMutation } = AdminApi;
