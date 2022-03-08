import { render, screen } from "@testing-library/react";
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
});
