import axios from "axios";

export class API {
  constructor() {
    this.http = axios;
    this.http.defaults.baseURL = "https://reqres.in/api/";
  }

  getUsersList = () => this.http.get("users");
  getUserDetail = (id) => this.http.get(`users/${id}`);
}

export default new API();
