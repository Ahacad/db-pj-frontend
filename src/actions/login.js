export const loginAction = (id, bio = "", username = "", userType = 1) => ({
  type: "LOGIN",
  id,
  bio,
  username,
  userType,
});

export const logoutAction = () => ({
  type: "LOGOUT",
  id: -1,
});

export const updateLikedRepliesAction = (likedReplies) => ({
  type: "UPDATE_REPLY_LIKES",
  likedReplies,
});

export const updateLikedPostsAction = (likedPosts) => ({
  type: "UPDATE_POST_LIKES",
  likedPosts,
});

export const setPosts = (posts) => ({
  type: "SET_POSTS",
  posts,
});

export const setReplies = (replies) => ({
  type: "SET_REPLIES",
  replies,
});
