import axios from "axios";
import { globalConstant } from "constant/constant";

export const axiosInstance = axios.create({
  baseURL: globalConstant.serverUrl,
});

const responseInterceptor = (response) => {
  return response;
};

const requestInterceptor = (config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  return config;
};
axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, (err) => {
  const expectedErrors = err.response && err.response.status >= 400 && err.response.status < 500;
});
