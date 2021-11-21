import axios from "axios";

export default axios.create({
  //Change this to the api server when deployed
  baseURL: "https://advanced-web-classroom-api.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});