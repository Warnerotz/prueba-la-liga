import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  usersDataSelect,
  usersDataErrorSelect,
} from "../../store/usersList/usersList.selector";
import { getUsersList } from "../../store/usersList/usersList.actions";
import { userLogOut } from "../../store/authUser/authUser.actions";
import UsersListDataTable from "../../components/usersListDataTable/usersListDataTable";
import { StyledMessage } from "./UserList.styles";
import ModalDialog from "../../components/modalDialog/modalDialog";

function UserList({ getUsersList, usersListData, logOut, usersListError }) {
  const [shouldOpenFailModal, setShouldOpenFailModal] = useState(false);

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  useEffect(() => {
    if (usersListError) {
      setShouldOpenFailModal(true);
    }
  }, [usersListError, setShouldOpenFailModal]);

  const Modal = ({ message }) => (
    <ModalDialog
      open={shouldOpenFailModal}
      modalBody={<StyledMessage>{message}</StyledMessage>}
      onConfirm={() => {
        setShouldOpenFailModal(false);
        getUsersList();
      }}
      confirmText={"Aceptar"}
    />
  );

  return !usersListData && !usersListError ? (
    <div>Cargando</div>
  ) : (
    <>
      {shouldOpenFailModal && (
        <Modal message={"Se ha producido un error inesperado"} />
      )}
      {!usersListError && (
        <UsersListDataTable
          usersListData={usersListData.data}
          logOut={logOut}
        />
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  usersListData: usersDataSelect,
  usersListError: usersDataErrorSelect,
});

const mapDispatchToProps = (dispatch) => ({
  getUsersList: () => dispatch(getUsersList()),
  logOut: () => dispatch(userLogOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
