import axios from "axios";
import { globalConstant } from "constant/constant";
export const VehicleApiService = {
  createVehicle: async (dataToSubmit) => {
    console.log("formData from VehicleService.js", dataToSubmit);
    const response = await axios.post(globalConstant.serverUrl + "/api/v1/vehicles", dataToSubmit, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  },
};
