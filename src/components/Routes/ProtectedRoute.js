import { Navigate } from "react-router-dom";
import * as actions from "../../actions/index";
import { connect } from "react-redux";
import { useEffect } from "react";

function ProtectedRoute(props) {
  const { loginStatus } = props;

  useEffect(() => {
    props.checkLoginStatus();
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
