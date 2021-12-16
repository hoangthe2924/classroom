import { Navigate } from "react-router-dom";
import * as actions from "store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ProtectedRoute(props) {
  const loginStatus = useSelector(state => state.loginStatus);
  const dispatch = useDispatch();

  const checkLoginStatus = () => {
    dispatch(actions.checkIsLoggedIn());
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if(loginStatus===true){
    return props.children;
  }
  else{
    localStorage.removeItem('prev-link');
    localStorage.setItem('prev-link', `${window.location.pathname+window.location.search}`);
    return <Navigate to="/login" />;
  }

  //return loginStatus === true ? props.children : <Navigate to="/login" />;
}

export default ProtectedRoute;
