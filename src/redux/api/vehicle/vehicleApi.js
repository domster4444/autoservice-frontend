import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";

export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: globalConstant.serverUrl,
  }),

  endpoints: (builder) => ({
    getVehicle: builder.query({
      query: () => ({
        url: "/api/v1/vehicles",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: "/api/v1/vehicles/" + id,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    updateVehicle: builder.mutation({
      query: (data) => ({
        url: "/api/v1/vehicles/" + data.id,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: data.body,
      }),
    }),

    getSingleVehicle: builder.query({
      query: (id) => ({
        url: "/api/v1/vehicles/" + id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }),
    }),

    updateVehicleStatus: builder.mutation({
      query: (data) => ({
        url: "/api/v1/vehicles/" + data.id,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: data.body,
      }),
    }),
  }),
});

export const { useGetVehicleQuery, useGetSingleVehicleQuery, useDeleteVehicleMutation, useUpdateVehicleMutation, useUpdateVehicleStatusMutation } = vehicleApi;
