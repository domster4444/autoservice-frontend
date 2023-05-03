import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
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

    //* --GET ALL EMPLOYEE
    getAllEmployee: builder.query({
      query: () => ({
        url: "/api/v1/employees",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    // * --CREATE AN EMPLOYEE
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/api/v1/employees",
        method: "POST",
        body: data.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    //* get single employee
    getSingleEmployee: builder.mutation({
      query: (id) => ({
        url: "/api/v1/employees/" + id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
    // * delete single employee
    deleteSingleEmployee: builder.mutation({
      query: (id) => ({
        url: "/api/v1/employees/" + id,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    updateEmployee: builder.mutation({
      query: (data) => ({
        url: "/api/v1/employees/" + data.id,
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

export const { useGetAllEmployeeQuery, useCreateEmployeeMutation, useGetSingleEmployeeMutation, useDeleteSingleEmployeeMutation, useUpdateEmployeeMutation } = employeeApi;
