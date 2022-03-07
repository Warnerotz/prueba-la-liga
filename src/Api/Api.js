import axios from "axios";

export class API {
  constructor() {
    this.http = axios;
    this.http.defaults.baseURL = "https://reqres.in/api/";
  }

  getUsersList = () => this.http.get("users");
  getUserDetail = (userId) => this.http.get(`users/${userId}`);
  updateUser = (userId, userData) =>
    this.http.patch(`users/${userId}`, { ...userData });

  deleteUser = (userId) => axios.delete(`users/${userId}`);
}

export default new API();
