import UserDetailTypes from "./userDetail.types";

const INITIAL_STATE = {
  userDetail: null,
  isLoading: false,
  error: null,
};

const getUserDetailStart = (state) => ({
  ...state,
  isLoading: true,
});

const getUserDetailSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  userDetail: payload,
  error: null,
});

const getUserDetailFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: payload,
});

const deleteUserStart = (state) => ({
  ...state,
  isLoading: true,
});

const deleteUserSuccess = (state) => ({
  ...state,
  isLoading: false,
  error: null,
});

const deleteUserFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: payload,
});

const updateUserStart = (state) => ({
  ...state,
  isLoading: true,
});

const updateUserSuccess = (state) => ({
  ...state,
  isLoading: false,
  error: null,
});

const updateUserFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: payload,
});

const reducerMap = {
  [UserDetailTypes.GET_USER_DETAIL_START]: getUserDetailStart,
  [UserDetailTypes.GET_USER_DETAIL_SUCCESS]: getUserDetailSuccess,
  [UserDetailTypes.GET_USER_DETAIL_FAILURE]: getUserDetailFailure,
  [UserDetailTypes.DELETE_USER_START]: deleteUserStart,
  [UserDetailTypes.DELETE_USER_SUCCESS]: deleteUserSuccess,
  [UserDetailTypes.DELETE_USER_FAILURE]: deleteUserFailure,
  [UserDetailTypes.UPDATE_USER_START]: updateUserStart,
  [UserDetailTypes.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [UserDetailTypes.UPDATE_USER_FAILURE]: updateUserFailure,
};

const reducer = (state = INITIAL_STATE, action) =>
  reducerMap[action.type] ? reducerMap[action.type](state, action) : state;

export default reducer;
