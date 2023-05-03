import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: globalConstant.serverUrl,
  }),

  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: (id) => ({
        url: "/api/v1/users/" + id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
    //--
    getUser: builder.query({
      query: () => ({
        url: "/api/v1/users/",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
    //--
    getUserByRole: builder.query({
      query: (role) => ({
        url: `/api/v1/users/role/${role}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
    //--
    deleteUser: builder.mutation({
      query: (id) => ({
        url: "/api/v1/users/" + id,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetUserByRoleQuery, useGetSingleUserQuery, useDeleteUserMutation } = userApi;
