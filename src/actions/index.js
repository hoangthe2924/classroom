import http from "../axios-config";
import authHeader from "services/auth-header";

export const login = (values) => {
  return async (dispatch) => {
    return await http
      .post("/users/login/", values)
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch(changeState(true));
        }
      })
      .catch((error) => console.log(error));
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("user");
    dispatch(changeState(false));
  };
};

export const checkIsLoggedIn = () => {
  return async (dispatch) => {
    return await http
      .get("/users/info/", { headers: authHeader() })
      .then((res) => {
        if (res.data.id) {
          dispatch(changeState(true));
          return;
        }
        dispatch(changeState(false));
      })
      .catch((error) => {
        dispatch(changeState(false));
      });
  };
};

export const changeState = (status) => {
  return {
    type: "IS_LOGGED_IN",
    status,
  };
};
