const initialState = {
  loggedin: false,
  id: -1,
  bio: "",
  username: "",
  userType: 1,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        loggedin: true,
        id: action.id || 1,
        bio: action.bio,
        username: action.username,
        userType: action.userType,
      };
    case "LOGOUT":
      return { loggedin: false, id: -1, bio: "", username: "", userType: 1 };
    default:
      return state;
  }
};

export default loginReducer;
