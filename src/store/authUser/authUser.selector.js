import { createSelector } from "reselect";

const authTokenlDataSelect = (state) => state.authToken;

export const isLoadingSelect = createSelector(
  [authTokenlDataSelect],
  (authToken) => authToken.isloading
);

export const authTokenSelect = createSelector(
  [authTokenlDataSelect],
  (authToken) => authToken.authToken
);

export const authTokenErrorSelect = createSelector(
  [authTokenlDataSelect],
  (authToken) => authToken.error
);
