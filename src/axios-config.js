import axios from "axios";
import { getToken } from "services/auth.service";

const token = getToken();
export default axios.create({
  //Change this to the api server when deployed
  baseURL: "http://localhost:7000",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
