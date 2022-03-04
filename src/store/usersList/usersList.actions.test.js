import thunk from "redux-thunk";
import axios from "axios";
import configureMockStore from "redux-mock-store";
import UsersListTypes from "./usersList.types";

import {
  getUsersListStart,
  getUsersListSuccess,
  getUsersListFailure,
  getUsersList,
} from "./usersList.actions";

jest.mock("axios");
const mockStore = configureMockStore([thunk]);

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

const MOCK_ERROR = { message: "mock error message" };

const INITIAL_STATE = {
  usersList: {},
  isLoading: false,
  error: null,
};

let mockedAxios;
let store;

beforeEach(() => {
  mockedAxios = axios;
  store = mockStore(INITIAL_STATE);
});

describe("getUsersListStart  action", () => {
  it("should be created", () => {
    const action = getUsersListStart();
    expect(action).toEqual({
      type: UsersListTypes.GET_USERS_LIST_START,
    });
  });
});

describe("getUsersListSuccess( action", () => {
  it("should be created", () => {
    const action = getUsersListSuccess(USERS_LIST_MOCK);
    expect(action).toEqual({
      type: UsersListTypes.GET_USERS_LIST_SUCCESS,
      payload: USERS_LIST_MOCK,
    });
  });
});

describe("getUsersListFailure( action", () => {
  it("should be created", () => {
    const action = getUsersListFailure(MOCK_ERROR);

    expect(action).toEqual({
      type: UsersListTypes.GET_USERS_LIST_FAILURE,
      payload: MOCK_ERROR,
    });
  });
});

describe("get user list action", () => {
  it("should dispatch suitable actions on get users list", async () => {
    const EXPECTED_ACTIONS = [
      { type: UsersListTypes.GET_USERS_LIST_START },
      { type: UsersListTypes.GET_USERS_LIST_SUCCESS, payload: USERS_LIST_MOCK },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: USERS_LIST_MOCK });

    await store.dispatch(getUsersList());

    const actualActions = await store.getActions();

    expect(actualActions).toEqual(EXPECTED_ACTIONS);
  });
});
