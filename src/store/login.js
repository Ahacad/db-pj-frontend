const initialState = {
  loggedin: false,
  id: -1,
  bio: "",
  username: "",
  userType: 1,
  likedReplies: [],
  likePosts: [],
  posts: [],
  replies: [],
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        loggedin: true,
        id: action.id,
        bio: action.bio,
        username: action.username,
        userType: action.userType,
        likedReplies: [],
        likedPosts: [],
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
    case "SET_POSTS":
      return {
        ...state,
        posts: action.posts,
      };
    case "SET_REPLIES":
      return {
        ...state,
        replies: action.replies,
      };
    default:
      return state;
  }
};

export default loginReducer;
