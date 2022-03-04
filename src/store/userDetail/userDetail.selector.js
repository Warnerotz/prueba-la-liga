import { createSelector } from "reselect";

const userDetailSelect = (state) => state.userDetail;

export const isLoadingSelect = createSelector(
  [userDetailSelect],
  (userDetail) => userDetail.isloading
);

export const userDataSelect = createSelector(
  [userDetailSelect],
  (userDetail) => userDetail.userDetail
);
