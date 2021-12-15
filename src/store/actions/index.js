import http from "../../axios-config";
import authHeader from "services/auth-header";
import { fetchAllClasses } from "../../services/class.service";

export const login = (values) => {
  return async (dispatch) => {
    return await http
      .post("/users/login/", values)
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch(changeState(true));

          fetchAllClasses().then(
            (result) => {
              dispatch({type: "FETCH", payload: result.data});
            },
            (error) => {
              console.log(error);
            }
          );
        }
      })
      .catch((error) => console.log(error));
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("user");
    dispatch(changeState(false));
    dispatch({type: "DELETE"});
  };
};

export const checkIsLoggedIn = () => {
  return async (dispatch) => {
    return await http
      .get("/users/info/", { headers: authHeader() })
      .then((res) => {
        if (res.data.id) {
          dispatch(changeState(true));
          fetchAllClasses().then(
            (result) => {
              dispatch({type: "FETCH", payload: result.data});
            },
            (error) => {
              console.log(error);
            }
          );
          return;
        }
        dispatch(changeState(false));
        dispatch({type: "DELETE"});
      })
      .catch((error) => {
        dispatch(changeState(false));
        dispatch({type: "DELETE"});
      });
  };
};

export const changeState = (status) => {
  return {
    type: "IS_LOGGED_IN",
    status,
  };
};
