import axios from "axios";
import api from "./api";

jest.mock("axios");

describe("API tests", () => {
  let mockedAxios;
  const USER_ID_MOCK = 1;

  beforeEach(() => {
    mockedAxios = axios;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return the user list on getUserList with all data", async () => {
    const EXPECTED_DATA = {
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

    mockedAxios.get.mockResolvedValueOnce({
      data: EXPECTED_DATA,
    });

    expect(await api.getUsersList()).toEqual({
      data: EXPECTED_DATA,
    });
  });

  it("should return the user detail data on getUserDetail", async () => {
    const EXPECTED_DATA = {
      data: {
        id: 1,
        email: "george.bluth@reqres.in",
        first_name: "George",
        last_name: "Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      },
    };

    mockedAxios.get.mockResolvedValueOnce({
      data: EXPECTED_DATA,
    });

    expect(await api.getUserDetail()).toEqual({
      data: EXPECTED_DATA,
    });
  });

  it("should update user data at call updateUserData", async () => {
    const USER_DATA_MOCK = {
      first_name: "adrian",
      last_name: "martinez",
      email: "a@google.com",
    };
    const baseUrl = `users/${USER_ID_MOCK}`;

    mockedAxios.patch.mockResolvedValueOnce({});

    await api.updateUser(USER_ID_MOCK, USER_DATA_MOCK);

    expect(mockedAxios.patch).toHaveBeenCalledWith(baseUrl, USER_DATA_MOCK);
  });

  it("should delete user when call delete user", async () => {
    mockedAxios.patch.mockResolvedValueOnce({});

    await api.deleteUser(USER_ID_MOCK);

    expect(mockedAxios.delete).toHaveBeenCalled();
  });

  it("should return the user token", async () => {
    const EXPECTED_DATA = { token: "asdiuhasdafeuix34bnxs" };
    const EXPECTED_URL = "login";
    const MOCKED_EMAIL = "a@a.com";
    const MOCKED_PASSWORD = "asdfgg";

    mockedAxios.post.mockResolvedValueOnce(EXPECTED_DATA);

    await api.authUserToken(MOCKED_EMAIL, MOCKED_PASSWORD);

    expect(mockedAxios.post).toHaveBeenCalledWith(EXPECTED_URL, {
      params: { email: MOCKED_EMAIL, password: MOCKED_PASSWORD },
    });
  });
});
