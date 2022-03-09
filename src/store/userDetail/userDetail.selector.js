import { createSelector } from "reselect";

const userDetailSelect = (state) => state.userDetail;

export const userDataSelect = createSelector(
  [userDetailSelect],
  (userDetail) => userDetail.userDetail
);

export const userDataErrorSelect = createSelector(
  [userDetailSelect],
  (userDetail) => userDetail.error
);
