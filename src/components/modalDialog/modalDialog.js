import {
  StyledDialog,
  ActionButton,
  StyledDialogActions,
} from "./modalDialog.styles";

function ModalDialog({
  open,
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
  modalBody,
  ...props
}) {
  const hasCancelOption = () => !!cancelText;
  const hasConfirmOption = () => !!confirmText;
  const hasActions = () => {
    return hasCancelOption() || hasConfirmOption();
  };

  return (
    <StyledDialog {...props} open={open} onClose={() => onCancel()}>
      {modalBody}
      {hasActions() && (
        <StyledDialogActions>
          {hasCancelOption() && (
            <ActionButton onClick={() => onCancel()}>{cancelText}</ActionButton>
          )}
          {hasConfirmOption() && (
            <ActionButton
              data-testid="dialog-action-button"
              variant="contained"
              onClick={() => onConfirm()}
            >
              {confirmText}
            </ActionButton>
          )}
        </StyledDialogActions>
      )}
    </StyledDialog>
  );
}

export default ModalDialog;
