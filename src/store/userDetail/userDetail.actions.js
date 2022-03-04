import api from "../../api/api";
import UserDetailTypes from "./userDetail.types";

export const getUserDetailStart = () => ({
  type: UserDetailTypes.GET_USER_DETAIL_START,
});

export const getUserDetailSuccess = (userDetail) => ({
  type: UserDetailTypes.GET_USER_DETAIL_SUCCESS,
  payload: userDetail,
});

export const getUserDetailFailure = (error) => ({
  type: UserDetailTypes.GET_USER_DETAIL_FAILURE,
  payload: error,
});

export const deleteUserStart = () => ({
  type: UserDetailTypes.DELETE_USER_START,
});

export const deleteUserSuccess = () => ({
  type: UserDetailTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailure = (error) => ({
  type: UserDetailTypes.DELETE_USER_FAILURE,
  payload: error,
});

export const updateUserStart = () => ({
  type: UserDetailTypes.UPDATE_USER_START,
});

export const updateUserSuccess = () => ({
  type: UserDetailTypes.UPDATE_USER_SUCCESS,
});

export const updateUserFailure = (error) => ({
  type: UserDetailTypes.UPDATE_USER_FAILURE,
  payload: error,
});

export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch(updateUserStart());
  try {
    await api.updateUser(userId, userData);
    dispatch(updateUserSuccess());
  } catch (error) {
    dispatch(updateUserFailure(error));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(deleteUserStart());
  try {
    await api.deleteUser(userId);
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFailure(error));
  }
};

export const getUserDetail = (userId) => async (dispatch) => {
  dispatch(getUserDetailStart());
  try {
    const { data } = await api.getUserDetail(userId);
    dispatch(getUserDetailSuccess(data.data));
  } catch (error) {
    dispatch(getUserDetailFailure(error));
  }
};
