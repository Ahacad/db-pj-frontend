const postsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_POSTS":
      return action.posts;
    default:
      return state;
  }
};

export default postsReducer;
