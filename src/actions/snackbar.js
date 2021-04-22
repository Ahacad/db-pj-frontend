export const showSuccessSnackbar = (message) => ({
  type: "SNACKBAR_SUCCESS",
  message,
});

export const clearSnackbar = () => ({
  type: "SNACKBAR_CLEAR",
});

export const showErrorSnackbar = (message) => ({
  type: "SNACKBAR_ERROR",
  message,
});
