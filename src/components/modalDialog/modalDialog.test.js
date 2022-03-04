import { fireEvent, screen, render } from "@testing-library/react";
import ModalDialog from "./ModalDialog";

describe("ModalDialog component", () => {
  const MOCK_BODY_TEXT = "some body content";
  const MOCK_BODY = <p>{MOCK_BODY_TEXT}</p>;
  const MOCK_ON_CONFIRM = jest.fn();
  const MOCK_ON_CANCEL = jest.fn();
  const MOCK_INITIAL_PROPS = {
    open: true,
    modalBody: MOCK_BODY,
  };

  const renderComponent = ({ customProps = MOCK_INITIAL_PROPS } = {}) =>
    render(<ModalDialog {...customProps} />);

  test("should render body provided as prop", () => {
    renderComponent();

    const bodyContent = screen.getByText(MOCK_BODY_TEXT);
    expect(bodyContent).toBeInTheDocument();
  });

  test("should not render DialogActions if no actions are provided", () => {
    const EXPECTED_BUTTONS_AMOUNT = 0;
    renderComponent();

    const actionsButtons = screen.queryAllByRole("button");
    expect(actionsButtons).toHaveLength(EXPECTED_BUTTONS_AMOUNT);
  });

  test("should render confirm button if confirm text is provided", () => {
    const confirmText = "some confirmation text";
    const UPDATED_PROPS = { ...MOCK_INITIAL_PROPS, confirmText };
    renderComponent({ customProps: UPDATED_PROPS });

    const actionButton = screen.getByRole("button");
    expect(actionButton).toHaveTextContent(confirmText);
  });

  test("should execute confirm function if it is provided", () => {
    const confirmText = "some confirmation text";
    const UPDATED_PROPS = {
      ...MOCK_INITIAL_PROPS,
      confirmText,
      onConfirm: MOCK_ON_CONFIRM,
    };
    renderComponent({ customProps: UPDATED_PROPS });

    const actionButton = screen.getByRole("button");
    fireEvent.click(actionButton);
    expect(MOCK_ON_CONFIRM).toHaveBeenCalled();
  });

  test("should render cancel button if cancel text is provided", () => {
    const cancelText = "some cancel text";
    const UPDATED_PROPS = { ...MOCK_INITIAL_PROPS, cancelText };
    renderComponent({ customProps: UPDATED_PROPS });

    const actionButton = screen.getByRole("button");
    expect(actionButton).toHaveTextContent(cancelText);
  });

  test("should execute cancel function if it is provided", () => {
    const cancelText = "some confirmation text";
    const UPDATED_PROPS = {
      ...MOCK_INITIAL_PROPS,
      cancelText,
      onCancel: MOCK_ON_CANCEL,
    };
    renderComponent({ customProps: UPDATED_PROPS });

    const actionButton = screen.getByRole("button");
    fireEvent.click(actionButton);
    expect(MOCK_ON_CANCEL).toHaveBeenCalled();
  });
});
