import { Navigate } from "react-router-dom";
import * as actions from "../../actions/index";
import { connect } from "react-redux";
import { useEffect } from "react";

function ProtectedRoute(props, { children, alternativePath = "/login" }) {
  const { loginStatus } = props;
  console.log("st", loginStatus);
  console.log("child", props.children);

  useEffect(() => {
    props.checkLoginStatus();
    console.log("sttPro", loginStatus);
  }, []);

  return loginStatus === true ? props.children : <Navigate to="/login" />;
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.loginStatus,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    checkLoginStatus: () => {
      dispatch(actions.checkIsLoggedIn());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
