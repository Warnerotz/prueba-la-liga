import { createSelector } from "reselect";

const dataSelect = (state) => state.users;

export const isLoadingSelect = createSelector(
  [dataSelect],
  (users) => users.isloading
);

export const usersDataSelect = createSelector(
  [dataSelect],
  (users) => users.usersList
);
