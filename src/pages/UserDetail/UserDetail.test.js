import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import UserDetail from "./UserDetail";

const initialState = {
  users: {
    isLoading: false,
    error: null,
    usersList: {
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
    userDetail: {
      fist_name: "juan",
      last_name: "gonzalez",
      email: "juan@gonzalez.com",
    },
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

describe("UserDetail page", () => {
  it("should show cargando message when data is not loading", () => {
    render(
      <Provider
        store={mockStore({
          ...initialState,
          userDetail: {
            userDetail: null,
            isLoading: false,
            error: null,
          },
        })}
      >
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Cargando")).toBeInTheDocument();
  });

  it("Should open the success modal when you submit the update data", async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      </Provider>
    );

    const nameInput = screen.getByLabelText("Nombre");
    const lastNameInput = screen.getByLabelText("Apellido");
    const emailImput = screen.getByLabelText("Email");
    const actButton = screen.getByRole("button", {
      name: "Actualizar",
    });

    userEvent.type(nameInput, "adrian");
    userEvent.type(lastNameInput, "martinez");
    userEvent.type(emailImput, "adrian@adrian.com");

    userEvent.click(actButton);
    expect(
      await screen.findByText("Se ha actualizado con exito")
    ).toBeInTheDocument();
  });

  it("should return to list page when click on update modal button", async () => {
    window.history.pushState({}, "Test page", "/users/1");
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      </Provider>
    );

    const nameInput = screen.getByLabelText("Nombre");
    const lastNameInput = screen.getByLabelText("Apellido");
    const emailImput = screen.getByLabelText("Email");
    const actButton = screen.getByRole("button", {
      name: "Actualizar",
    });

    userEvent.type(nameInput, "adrian");
    userEvent.type(lastNameInput, "martinez");
    userEvent.type(emailImput, "adrian@adrian.com");

    userEvent.click(actButton);

    const modalButton = await screen.findByText("Aceptar");

    userEvent.click(modalButton);

    expect(window.location.pathname).toBe("/");
  });

  it("should open delete succes modal when click on delete button", async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      </Provider>
    );

    const deleteButton = screen.getByRole("button", {
      name: "Borrar",
    });

    userEvent.click(deleteButton);
    expect(
      await screen.findByText("Se ha Borrado con exito")
    ).toBeInTheDocument();
  });

  it("should return to list page after clicking delete modal button", async () => {
    window.history.pushState({}, "Test page", "/users/1");
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      </Provider>
    );

    const deleteButton = screen.getByRole("button", {
      name: "Borrar",
    });

    userEvent.click(deleteButton);
    const modalButton = await screen.findByText("Aceptar");
    userEvent.click(modalButton);

    expect(window.location.pathname).toBe("/");
  });

  it("should return to login page when you click logout button", () => {
    window.history.pushState({}, "Test page", "/users/1");
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      </Provider>
    );

    const logOutButton = screen.getByRole("button", {
      name: "Desloguearse",
    });

    userEvent.click(logOutButton);

    expect(window.location.pathname).toBe("/login");
  });

  it("should return to list page when you click go back button", () => {
    window.history.pushState({}, "Test page", "/users/1");
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      </Provider>
    );

    const backButton = screen.getByRole("button", {
      name: "Volver",
    });

    userEvent.click(backButton);

    expect(window.location.pathname).toBe("/");
  });

  it("should not open the modal text if exist some error on confirm", () => {
    render(
      <Provider
        store={mockStore({
          ...initialState,
          userDetail: {
            userDetail: {
              first_name: "Adrian",
              last_name: "martinez",
              email: "a@a.com",
            },
            isLoading: false,
            error: { message: "error" },
          },
        })}
      >
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      </Provider>
    );

    const nameInput = screen.getByLabelText("Nombre");
    const lastNameInput = screen.getByLabelText("Apellido");
    const emailImput = screen.getByLabelText("Email");
    const actButton = screen.getByRole("button", {
      name: "Actualizar",
    });

    userEvent.type(nameInput, "adrian");
    userEvent.type(lastNameInput, "martinez");
    userEvent.type(emailImput, "adrian@adrian.com");

    userEvent.click(actButton);
    expect(screen.queryByText("Se ha actualizado con exito")).toBeNull();
  });

  it("should not open the modal text if exist some error on delete", () => {
    render(
      <Provider
        store={mockStore({
          ...initialState,
          userDetail: {
            userDetail: {
              first_name: "Adrian",
              last_name: "martinez",
              email: "a@a.com",
            },
            isLoading: false,
            error: { message: "error" },
          },
        })}
      >
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      </Provider>
    );

    const delButton = screen.getByRole("button", {
      name: "Borrar",
    });

    userEvent.click(delButton);
    expect(screen.queryByText("Se ha Borrado con exito")).toBeNull();
  });
});
