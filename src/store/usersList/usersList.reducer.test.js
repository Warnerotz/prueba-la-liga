import UsersListTypes from "./usersList.types";
import userListReducer from "./usersList.reducer";

const INITIAL_STATE = {
  usersList: null,
  isLoading: false,
  error: null,
};
const USERS_LIST_MOCK = {
  page: 1,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: [
    {
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    },
    {
      id: 2,
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      last_name: "Weaver",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    },
    {
      id: 3,
      email: "emma.wong@reqres.in",
      first_name: "Emma",
      last_name: "Wong",
      avatar: "https://reqres.in/img/faces/3-image.jpg",
    },
    {
      id: 4,
      email: "eve.holt@reqres.in",
      first_name: "Eve",
      last_name: "Holt",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    },
    {
      id: 5,
      email: "charles.morris@reqres.in",
      first_name: "Charles",
      last_name: "Morris",
      avatar: "https://reqres.in/img/faces/5-image.jpg",
    },
    {
      id: 6,
      email: "tracey.ramos@reqres.in",
      first_name: "Tracey",
      last_name: "Ramos",
      avatar: "https://reqres.in/img/faces/6-image.jpg",
    },
  ],
};
const ERROR_MOCK = { message: "error" };

describe("usersListReducer", () => {
  it("should return initial state", () => {
    expect(userListReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should set isLoading to true when users list starts", () => {
    const state = userListReducer(INITIAL_STATE, {
      type: UsersListTypes.GET_USERS_LIST_START,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      isLoading: true,
      error: null,
    });
  });
  it("should set usersList when users list success", () => {
    const state = userListReducer(INITIAL_STATE, {
      type: UsersListTypes.GET_USERS_LIST_SUCCESS,
      payload: USERS_LIST_MOCK,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      error: null,
      isLoading: false,
      usersList: USERS_LIST_MOCK,
    });
  });
  it("should set error when users list failure", () => {
    const state = userListReducer(INITIAL_STATE, {
      type: UsersListTypes.GET_USERS_LIST_FAILURE,
      payload: ERROR_MOCK,
    });
    expect(state).toEqual({
      ...INITIAL_STATE,
      error: ERROR_MOCK,
      isLoading: false,
    });
  });
});
