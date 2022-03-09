import { createSelector } from "reselect";

const dataSelect = (state) => state.users;

export const usersDataSelect = createSelector(
  [dataSelect],
  (users) => users.usersList
);

export const usersDataErrorSelect = createSelector(
  [dataSelect],
  (users) => users.error
);
