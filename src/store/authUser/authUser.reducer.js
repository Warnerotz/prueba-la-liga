import GetUserAuthTypes from "./authUser.types";

const INITIAL_STATE = {
  authToken: null,
  isLoading: false,
  error: null,
};

const getUserAuthTokenStart = (state) => ({
  ...state,
  isLoading: true,
});

const getUserAuthTokenSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  authToken: payload,
  error: null,
});

const getUserAuthTokenFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  authToken: null,
  error: payload,
});

const reducerMap = {
  [GetUserAuthTypes.GET_AUTH_TOKEN_START]: getUserAuthTokenStart,
  [GetUserAuthTypes.GET_AUTH_TOKEN_SUCCESS]: getUserAuthTokenSuccess,
  [GetUserAuthTypes.GET_AUTH_TOKEN_FAILURE]: getUserAuthTokenFailure,
};

const reducer = (state = INITIAL_STATE, action) =>
  reducerMap[action.type] ? reducerMap[action.type](state, action) : state;

export default reducer;
