import { axiosInstance } from "library/utilities/axiosIntercept";

export const CategoryApiService = {
  createCategory: async (data) => {
    const { categoryTitle, categoryDescription } = data;
    const response = await axiosInstance.post("/api/v1/categories", {
      name: categoryTitle,
      description: categoryDescription,
    });

    return response;
  },
};
