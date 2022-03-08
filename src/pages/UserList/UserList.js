import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  isLoadingSelect,
  usersDataSelect,
} from "../../store/usersList/usersList.selector";
import { getUsersList } from "../../store/usersList/usersList.actions";
import { userLogOut } from "../../store/authUser/authUser.actions";
import UsersListDataTable from "../../components/usersListDataTable/usersListDataTable";

function UserList({ getUsersList, usersListData, logOut }) {
  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  return !usersListData ? (
    <div>cargando</div>
  ) : (
    <UsersListDataTable usersListData={usersListData.data} logOut={logOut} />
  );
}

const mapStateToProps = createStructuredSelector({
  usersListData: usersDataSelect,
  isLoading: isLoadingSelect,
});

const mapDispatchToProps = (dispatch) => ({
  getUsersList: () => dispatch(getUsersList()),
  logOut: () => dispatch(userLogOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
