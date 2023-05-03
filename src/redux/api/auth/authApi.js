import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: globalConstant.serverUrl,
  }),

  endpoints: (builder) => ({
    postAuthUser: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    sendForgotPasswordEmail: builder.mutation({
      query: (body) => ({
        url: "/api/v1/forgot-password/admin",
        method: "POST",
        body,
      }),
    }),

    // change pass after receiving email
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/forgot-password/admin/change",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostAuthUserMutation, useSendForgotPasswordEmailMutation, useChangePasswordMutation } = authApi;
