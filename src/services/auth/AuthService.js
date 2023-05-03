import axios from "axios";
import { globalConstant } from "constant/constant";
export class UserApiService {
  static serverUrl = globalConstant.serverUrl;
  static getAllUsers(body) {
    const { phoneNumber, password } = body;
    return axios.post(`${this.serverUrl}/api/v1/auth`, { phone_number: phoneNumber, password: password });
  }
}
