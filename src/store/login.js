const initialState = {
  loggedin: false,
  id: -1,
  bio: "",
  username: "",
  userType: 1,
  likedReplies: [],
  likePosts: [],
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
        ...state,
      };
    case "LOGOUT":
      return initialState;
    case "UPDATE_REPLY_LIKES":
      return {
        ...state,
        likedReplies: action.likedReplies,
      };
    case "UPDATE_POST_LIKES":
      return {
        ...state,
        likedPosts: action.likedPosts,
      };
    default:
      return state;
  }
};

export default loginReducer;
