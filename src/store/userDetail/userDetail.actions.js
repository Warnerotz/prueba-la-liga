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

export const getUserDetail = (userId) => async (dispatch) => {
  dispatch(getUserDetailStart());
  try {
    const { data } = await api.getUserDetail(userId);
    dispatch(getUserDetailSuccess(data.data));
  } catch (error) {
    dispatch(getUserDetailFailure(error));
  }
};
