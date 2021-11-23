import axios from "axios";

export default axios.create({
  //Change this to the api server when deployed
  baseURL: "http://localhost:7000",
  headers: {
    "Content-type": "application/json",
  },
});
