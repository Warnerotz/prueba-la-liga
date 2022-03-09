import { createSelector } from "reselect";

const authTokenlDataSelect = (state) => state.authToken;

export const authTokenSelect = createSelector(
  [authTokenlDataSelect],
  (authToken) => authToken.authToken
);

export const authTokenErrorSelect = createSelector(
  [authTokenlDataSelect],
  (authToken) => authToken.error
);
