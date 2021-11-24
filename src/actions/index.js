import http from "../axios-config";

export const login = (values) => {
  return async (dispatch) => {
    return await http
      .post("/users/login/", values)
      .then((res) => {
        console.log(res.data);
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
      .get("/users/info/")
      .then((res) => {
        console.log("checkIsLoggedIn", res.data);
        if (res.data.id) {
          console.log("true");
          dispatch(changeState(true));
          return;
        }
        console.log("falsess");
        dispatch(changeState(false));
      })
      .catch((error) => {
        console.log("errr: ", error);
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
