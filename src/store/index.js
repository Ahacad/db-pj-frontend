import { combineReducers, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "./login";
import snackbarReducer from "./snackbar";
//import { throttle } from "lodash";

const getLocalstorageUserState = () => {
  const originUser = { loggedin: false, id: -1 };
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      return originUser;
    } else {
      return user;
    }
  } catch (err) {
    console.error(err);
    return originUser;
  }
};

const initialState = {
  login: getLocalstorageUserState(),
  snackbar: {
    snackbarOpen: false,
    message: "",
    severity: "success",
  },
};

const store = createStore(
  combineReducers({
    login: loginReducer,
    snackbar: snackbarReducer,
  }),
  initialState,
  composeWithDevTools()
);

store.subscribe(() => {
  // save user state
  try {
    localStorage.setItem("user", JSON.stringify(store.getState().login));
  } catch (err) {
    console.error(err);
  }
});

export default store;
