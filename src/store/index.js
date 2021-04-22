import { combineReducers, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "./login";

const initialState = {
  login: {
    loggedin: false,
    id: -1,
  },
};

export default createStore(
  combineReducers({
    login: loginReducer,
  }),
  initialState,
  composeWithDevTools()
);
