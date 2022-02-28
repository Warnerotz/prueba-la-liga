import axios from "axios";

export class API {
  constructor() {
    this.http = axios;
    this.http.defaults.baseURL = "https://reqres.in/api/";
  }

  getUserList = () => {
    return axios.get("users");
  };
}

export default new API();
