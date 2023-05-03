import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";

export const serviceRequestApi = createApi({
  reducerPath: "serviceRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: globalConstant.serverUrl,
  }),

  endpoints: (builder) => ({
    postServiceRequest: builder.mutation({
      query: (body) => ({
        url: "/api/v1/service-request/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
    }),

    updateServiceRequestStatus: builder.mutation({
      query: (data) => ({
        url: "/api/v1/service-request/" + data.id,
        method: "PATCH",
        body: data.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllServiceRequest: builder.query({
      query: () => ({
        url: "/api/v1/service-request",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getSingleServiceRequest: builder.query({
      query: (id) => ({
        url: "/api/v1/service-request/" + id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    updateServiceRequest: builder.mutation({
      query: (data) => ({
        url: "/api/v1/service-request/" + data.id,
        method: "PUT",
        body: data.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    deleteServiceRequest: builder.mutation({
      query: (id) => ({
        url: "/api/v1/service-request/" + id,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useUpdateServiceRequestMutation, useGetSingleServiceRequestQuery, useUpdateServiceRequestStatusMutation, usePostServiceRequestMutation, useGetAllServiceRequestQuery, useDeleteServiceRequestMutation } = serviceRequestApi;
