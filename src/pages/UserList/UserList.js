import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  isLoadingSelect,
  usersDataSelect,
} from "../../store/usersList/usersList.selector";
import { getUsersList } from "../../store/usersList/usersList.actions";
import UsersListDataTable from "../../components/usersListDataTable/usersListDataTable";

function UserList({ getUsersList, usersListData, isLoading }) {
  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  return isLoading ? (
    <div>cargando</div>
  ) : (
    <UsersListDataTable
      usersListData={usersListData ? usersListData.data : null}
    />
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
