import { combineReducers, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "./login";
import snackbarReducer from "./snackbar";

const initialState = {
  login: {
    loggedin: false,
    id: -1,
  },
  snackbar: {
    successSnackbarOpen: false,
    successSnackbarMessage: "",
    errorSnackbarOpen: false,
    infoSnackbarOpen: false,
  },
};

export default createStore(
  combineReducers({
    login: loginReducer,
    snackbar: snackbarReducer,
  }),
  initialState,
  composeWithDevTools()
);
