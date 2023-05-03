import axios from "axios";
import { globalConstant } from "constant/constant";
export const UserApiService = {
  updateUser: async (dataToSubmit) => {
    const response = await axios.put(globalConstant.serverUrl + "/api/v1/users/" + dataToSubmit.id, dataToSubmit.body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  },

  createUser: async (dataToSubmit) => {
    console.log("data from UserService.js", dataToSubmit);
    const response = await axios.post(globalConstant.serverUrl + "/api/v1/users", dataToSubmit, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  },
};
