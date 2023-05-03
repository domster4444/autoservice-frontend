import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: globalConstant.serverUrl,
  }),

  endpoints: (builder) => ({
    // postAuthUser: builder.mutation({
    //   query: (body) => ({
    //     url: "/auth/login",
    //     method: "POST",
    //     body,
    //   }),
    // }),

    //--
    getCategory: builder.query({
      query: () => ({
        url: "/api/v1/categories/",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: "/api/v1/categories/" + id,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    // get single category
    getSingleCategory: builder.query({
      query: (id) => ({
        url: "/api/v1/categories/" + id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: "/api/v1/categories/" + data.id,
        method: "PUT",
        body: data.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useGetCategoryQuery, useDeleteCategoryMutation, useGetSingleCategoryQuery, useUpdateCategoryMutation } = categoryApi;
