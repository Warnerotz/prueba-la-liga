import api from "../../api/api";
import UsersListTypes from "./usersList.types";

export const getUsersListStart = () => ({
  type: UsersListTypes.GET_USERS_LIST_START,
});

export const getUsersListSuccess = (usersList) => ({
  type: UsersListTypes.GET_USERS_LIST_SUCCESS,
  payload: usersList,
});

export const getUsersListFailure = (error) => ({
  type: UsersListTypes.GET_USERS_LIST_FAILURE,
  payload: error,
});

export const getUsersList = (page) => async (dispatch) => {
  dispatch(getUsersListStart());
  try {
    const { data } = await api.getUsersList(page);
    dispatch(getUsersListSuccess(data));
  } catch (error) {
    dispatch(getUsersListFailure(error));
  }
};
