import GetAuthTokenTypes, { UserLogOutTypes } from "./authUser.types";
import api from "../../api/api";

export const getAuthTokenStart = () => ({
  type: GetAuthTokenTypes.GET_AUTH_TOKEN_START,
});

export const getAuthTokenSuccess = (authToken) => ({
  type: GetAuthTokenTypes.GET_AUTH_TOKEN_SUCCESS,
  payload: authToken,
});

export const getAuthTokenFailure = (error) => ({
  type: GetAuthTokenTypes.GET_AUTH_TOKEN_FAILURE,
  payload: error,
});

export const userLogOutStart = () => ({
  type: UserLogOutTypes.USER_LOG_OUT,
});

export const userLogOut = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(userLogOutStart());
};

export const getAuthToken = (email, password) => async (dispatch) => {
  dispatch(getAuthTokenStart());
  try {
    const { data } = await api.authUserToken(email, password);
    localStorage.setItem("token", data.token);
    dispatch(getAuthTokenSuccess(data.token));
  } catch (error) {
    dispatch(getAuthTokenFailure(error));
  }
};
