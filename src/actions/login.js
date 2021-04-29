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
