import UsersListTypes from "./usersList.types";

const INITIAL_STATE = {
  usersList: null,
  isLoading: false,
  error: null,
};

const getUsersListStart = (state) => ({
  ...state,
  isLoading: true,
});

const getUSersListSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  usersList: payload,
  error: null,
});

const getUsersListFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: payload,
});

const reducerMap = {
  [UsersListTypes.GET_USERS_LIST_START]: getUsersListStart,
  [UsersListTypes.GET_USERS_LIST_SUCCESS]: getUSersListSuccess,
  [UsersListTypes.GET_USERS_LIST_FAILURE]: getUsersListFailure,
};

const reducer = (state = INITIAL_STATE, action) =>
  reducerMap[action.type] ? reducerMap[action.type](state, action) : state;

export default reducer;
