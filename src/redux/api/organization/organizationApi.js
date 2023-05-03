import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: globalConstant.serverUrl,
  }),

  endpoints: (builder) => ({
    getOrganization: builder.query({
      query: () => ({
        url: "/api/v1/organizations/",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    //-- delete organization
    deleteOrganization: builder.mutation({
      query: (id) => ({
        url: "/api/v1/organizations/" + id,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getSingleOrganization: builder.query({
      query: (id) => ({
        url: "/api/v1/organizations/" + id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    updateOrganization: builder.mutation({
      query: (data) => ({
        url: "/api/v1/organizations/" + data.id,
        method: "PUT",
        body: data.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    createOrganization: builder.mutation({
      query: (body) => ({
        url: "/api/v1/organizations",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useCreateOrganizationMutation, useGetOrganizationQuery, useDeleteOrganizationMutation, useGetSingleOrganizationQuery, useUpdateOrganizationMutation } = organizationApi;
