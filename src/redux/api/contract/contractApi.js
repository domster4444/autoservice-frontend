import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";

export const contractApi = createApi({
  reducerPath: "contractApi",
  baseQuery: fetchBaseQuery({
    baseUrl: globalConstant.serverUrl,
  }),

  endpoints: (builder) => ({
    // get single category
    getSingleContract: builder.mutation({
      query: (data) => ({
        url: "/api/v1/organizations/contract",
        body: {
          org: data.orgId,
          id: data.id,
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    // update single category
    updateSingleContract: builder.mutation({
      query: (data) => ({
        url: "/api/v1/organizations/contract/" + data.id,
        body: {
          organization: data.orgId,
          start_date: data.contractStartDate,
          end_date: data.contractEndDate,
        },
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useGetSingleContractMutation, useUpdateSingleContractMutation } = contractApi;
