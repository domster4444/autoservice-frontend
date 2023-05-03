import { getDataByValue as getCookieDataByValue } from "./Cookie";
import { getDataByObj as getLocalStorageDataByObj } from "./LocalStorageService";

const isAuth = () => {
  if (getCookieDataByValue("token") && getLocalStorageDataByObj("user")) {
    const user = getLocalStorageDataByObj("user");
    return user;
  }
  return false;
};

export default isAuth;
