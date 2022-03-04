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

const reducerMap = {
  [UserDetailTypes.GET_USER_DETAIL_START]: getUserDetailStart,
  [UserDetailTypes.GET_USER_DETAIL_SUCCESS]: getUserDetailSuccess,
  [UserDetailTypes.GET_USER_DETAIL_FAILURE]: getUserDetailFailure,
};

const reducer = (state = INITIAL_STATE, action) =>
  reducerMap[action.type] ? reducerMap[action.type](state, action) : state;

export default reducer;
