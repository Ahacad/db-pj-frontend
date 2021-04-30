import { combineReducers, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "./login";
import snackbarReducer from "./snackbar";
import postsReducer from "./posts";
//import { throttle } from "lodash";

const getLocalstorageUserState = () => {
  const originUser = {
    loggedin: false,
    id: -1,
    bio: "",
    username: "",
    userType: 1,
    likePosts: [],
    likedReplies: [],
  };
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
  posts: [],
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
    posts: postsReducer,
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
