import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import axios from "axios";
import UserList from "./UserList";

const initialState = {
  users: {
    isLoading: false,
    error: null,
    usersList: {
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 1,
          first_name: "adrian",
          last_name: "martinez",
          email: "adrian@adrian.com",
        },
      ],
    },
  },
  userDetail: {
    userDetail: null,
    isLoading: false,
    error: null,
  },
  authToken: {
    authToken: "QpwL5tke4Pnpja7X1",
    isLoading: false,
    error: null,
  },
};
const mockStore = configureStore([thunk]);
jest.mock("axios");

describe("UserListPage", () => {
  let mockedAxios;

  beforeEach(() => {
    mockedAxios = axios;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should show cargando message when data is not loading", () => {
    render(
      <Provider
        store={mockStore({
          ...initialState,
          users: {
            isLoading: false,
            error: null,
            usersList: null,
          },
        })}
      >
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Cargando")).toBeInTheDocument();
  });

  it("should render the correct number of items in the table", () => {
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    );

    const row = screen.getAllByRole("row");

    expect(row).toHaveLength(2);
  });

  it("should redirect to user list detail when click on the button", () => {
    window.history.pushState({}, "Test page", "/");
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByRole("button", { name: "Modificar" });

    userEvent.click(button);

    expect(window.location.pathname).toEqual("/users/1");
  });

  it("should redirect to login when you click log out button", () => {
    window.history.pushState({}, "Test page", "/");
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByRole("button", { name: "Desloguearse" });

    userEvent.click(button);

    expect(window.location.pathname).toEqual("/login");
  });

  it("should show the modal warning when in load moment has an error", async () => {
    render(
      <Provider
        store={mockStore({
          ...initialState,
          users: {
            isLoading: false,
            error: { message: "error" },
            usersList: null,
          },
        })}
      >
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    );

    expect(
      await screen.findByText("Se ha producido un error inesperado")
    ).toBeInTheDocument();
  });

  it("should close modal and take data from server when click on confirm modal button", async () => {
    render(
      <Provider
        store={mockStore({
          ...initialState,
          users: {
            isLoading: false,
            error: { message: "error" },
            usersList: null,
          },
        })}
      >
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    );

    const modalButton = await screen.findByText("Aceptar");

    userEvent.click(modalButton);

    expect(
      screen.queryByText("Se ha producido un error inesperado")
    ).toBeNull();

    expect(mockedAxios.get).toHaveBeenCalled();
  });
});
