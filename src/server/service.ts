import axios from "axios";

export const api = axios.create({
  baseURL: "https://dashboard-operacional-backend-4b392a9c5ff4.herokuapp.com/api",
});
