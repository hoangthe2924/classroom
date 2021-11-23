import http from "axios-config";


export function login(values) {
    return http
    .post("/users/login/", values)
    .then((res) => {
      console.log(res.data);
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    })
    .catch((error) => {
      console.log("err: ", error);
    });
  }

export function logout() {
    localStorage.removeItem("user");
}

export function register(values) {
    return http
    .post("/users/register/", values)
    .then((res) => {
      console.log("res", res);
      if (res.status === 200 || res.status === 201) {
        alert("Your question has been submited!");
      } else {
        alert("Please try again later");
      }
    })
    .catch((error) => {
      console.log("err: ", error);
    });
  }
