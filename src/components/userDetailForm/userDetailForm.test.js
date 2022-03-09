import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserDetailForm from "./userDetailForm";

describe("User detail form", () => {
  const USER_DETAIL_MOCK = {
    first_name: "Adrian",
    last_name: "Martinez",
    email: "a@a.com",
  };
  it("should render the correct elements", () => {
    render(<UserDetailForm userDetail={USER_DETAIL_MOCK} />);

    const nameInput = screen.getByLabelText("Nombre");
    const lastNameInput = screen.getByLabelText("Apellido");
    const emailImput = screen.getByLabelText("Email");
    const actButton = screen.getByRole("button", {
      name: "Actualizar",
    });
    const deleteButton = screen.getByRole("button", {
      name: "Borrar",
    });
    const backButton = screen.getByRole("button", {
      name: "Volver",
    });
    const logOutButton = screen.getByRole("button", {
      name: "Desloguearse",
    });

    expect(nameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailImput).toBeInTheDocument();
    expect(actButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    expect(logOutButton).toBeInTheDocument();
  });

  it("should dispatch handleSubmitdata button", () => {
    const handleSubmitdata = jest.fn();
    render(
      <UserDetailForm
        userDetail={USER_DETAIL_MOCK}
        handleSumitData={handleSubmitdata}
      />
    );

    const actButton = screen.getByRole("button", {
      name: "Actualizar",
    });

    userEvent.click(actButton);

    expect(handleSubmitdata).toHaveBeenCalled();
  });

  it("should dispatch handleDeleteUser button", () => {
    const handleDeleteUser = jest.fn();
    render(
      <UserDetailForm
        userDetail={USER_DETAIL_MOCK}
        handleDeleteUser={handleDeleteUser}
      />
    );

    const actButton = screen.getByRole("button", {
      name: "Borrar",
    });

    userEvent.click(actButton);

    expect(handleDeleteUser).toHaveBeenCalled();
  });

  it("should dispatch handleLogOut button", () => {
    const handleLogOut = jest.fn();
    render(
      <UserDetailForm
        userDetail={USER_DETAIL_MOCK}
        handleLogOut={handleLogOut}
      />
    );

    const actButton = screen.getByRole("button", {
      name: "Desloguearse",
    });

    userEvent.click(actButton);

    expect(handleLogOut).toHaveBeenCalled();
  });

  it("should dispatch handleGoBack button", () => {
    const handleGoBack = jest.fn();
    render(
      <UserDetailForm
        userDetail={USER_DETAIL_MOCK}
        handleGoBack={handleGoBack}
      />
    );

    const actButton = screen.getByRole("button", {
      name: "Volver",
    });

    userEvent.click(actButton);

    expect(handleGoBack).toHaveBeenCalled();
  });
});
