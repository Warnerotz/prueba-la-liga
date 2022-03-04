import styled from "styled-components";
import { Dialog, DialogActions, Button } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  & .MuiPaper-rounded {
    border-radius: 1rem;
  }
  & .MuiPaper-elevation24 {
    box-shadow: 0 0 0.75rem 0 rgba(0, 0, 0, 0.22);
  }
  & .MuiBackdrop-root {
    background-color: rgba(123, 123, 123, 0.7);
  }
  & .MuiDialog-paperWidthSm {
    max-width: none;
  }
`;

export const ActionButton = styled(Button)`
  font-weight: 800;
`;

export const StyledDialogActions = styled(DialogActions)`
  padding: 0 162px 20px;
`;
