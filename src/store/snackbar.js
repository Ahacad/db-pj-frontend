const snackbarReducer = (state = {}, action) => {
  switch (action.type) {
    case "SNACKBAR_SUCCESS":
      return {
        ...state,
        snackbarOpen: true,
        message: action.message,
        severity: "success",
      };
    case "SNACKBAR_ERROR":
      return {
        ...state,
        snackbarOpen: true,
        message: action.message,
        severity: "error",
      };
    case "SNACKBAR_CLEAR":
      return {
        ...state,
        snackbarOpen: false,
      };
    default:
      return state;
  }
};

export default snackbarReducer;
