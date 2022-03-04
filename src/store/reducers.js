import { combineReducers } from "redux";

import users from "./usersList/usersList.reducer";
import userDetail from "./userDetail/userDetail.reducer";

export default combineReducers({ users, userDetail });
