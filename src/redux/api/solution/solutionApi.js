import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";

export const solutionApi = createApi({
  reducerPath: "solutionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: globalConstant.serverUrl,
  }),

  endpoints: (builder) => ({
    getSingleSolution: builder.mutation({
      query: (id) => ({
        url: "/api/v1/solutions/" + id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    // change solution state
    // /api/v1/solutions/change-state/:id

    changeSolutionState: builder.mutation({
      query: (data) => ({
        url: "/api/v1/solutions/change-state/" + data.id,
        method: "POST",
        body: data.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    createSolution: builder.mutation({
      query: (data) => ({
        url: "/api/v1/service-request/addSolution/" + data.id,
        method: "POST",
        body: data.body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    deleteSolution: builder.mutation({
      query: (id) => ({
        url: "/api/v1/solutions/" + id,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
    updateSolution: builder.mutation({
      query: (data) => ({
        url: "/api/v1/solutions/" + data.id,
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

export const { useCreateSolutionMutation, useGetSingleSolutionMutation, useChangeSolutionStateMutation, useUpdateSolutionMutation, useDeleteSolutionMutation } = solutionApi;
