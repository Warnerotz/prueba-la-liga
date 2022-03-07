import { combineReducers } from "redux";

import users from "./usersList/usersList.reducer";
import userDetail from "./userDetail/userDetail.reducer";
import authToken from "./authUser/authUser.reducer";

export default combineReducers({ users, userDetail, authToken });
