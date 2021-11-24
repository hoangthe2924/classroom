let initialState = true;

let loginStatus = (state = initialState, action) => {
  switch (action.type) {
    case "IS_LOGGED_IN":
      console.log("checkStatus", action.status);
      state = action.status;
      return action.status;
    default:
      return state;
  }
};
export default loginStatus;
