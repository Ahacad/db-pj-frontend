import { createStore } from "redux";

const initialState = {
  loggedin: false,
  id: -1,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { loggedin: true, id: 1 };
    case "LOGOUT":
      return { loggedin: false, id: -1 };
    default:
      return state;
  }
};

const loginStore = createStore(
  loginReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default loginStore;
