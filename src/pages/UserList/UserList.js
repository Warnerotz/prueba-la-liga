import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  isLoadingSelect,
  usersDataSelect,
} from "../../store/usersList/usersList.selector";
import { getUsersList } from "../../store/usersList/usersList.actions";
import UsersListDataTable from "../../components/usersListDataTable/usersListDataTable";

function UserList({ getUsersList, usersListData }) {
  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  return !usersListData ? (
    <div>cargando</div>
  ) : (
    <UsersListDataTable usersListData={usersListData.data} />
  );
}

const mapStateToProps = createStructuredSelector({
  usersListData: usersDataSelect,
  isLoading: isLoadingSelect,
});

const mapDispatchToProps = (dispatch) => ({
  getUsersList: () => dispatch(getUsersList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
