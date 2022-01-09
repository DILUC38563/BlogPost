export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccessfull = (profile) => ({
  type: "LOGIN_SUCCESS",
  payload: profile,
});

export const LoginFail = () => ({
  type: "LOGIN_FAIL",
});
export const Logout = () => ({
  type: "LOGOUT",
});

export const UpdateStart = (userCredentials) => ({
  type: "UPDATE_START",
});

export const UpdateSuccessfull = (profile) => ({
  type: "UPDATE_SUCCESS",
  payload: profile,
});

export const UpdateFail = () => ({
  type: "UPDATE_FAIL",
});
