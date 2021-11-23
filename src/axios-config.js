import axios from "axios";

export default axios.create({
  //Change this to the api server when deployed
  // baseURL: "https://advanced-web-classroom-api.herokuapp.com/",
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json",
  },
});
