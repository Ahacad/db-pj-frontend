export const loginAction = (id) => ({
  type: "LOGIN",
  id,
});

export const logoutAction = () => ({
  type: "LOGOUT",
  id: -1,
});
