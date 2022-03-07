import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { StyledMessage } from "./UserDetail.styles";
import {
  userDataErrorSelect,
  userDataSelect,
} from "../../store/userDetail/userDetail.selector";
import {
  deleteUser,
  getUserDetail,
  updateUser,
} from "../../store/userDetail/userDetail.actions";
import UserDetailForm from "../../components/userDetailForm/userDetailForm";
import ModalDialog from "../../components/modalDialog/modalDialog";

function UserDetail({
  getUserDetail,
  userDetail,
  updateUser,
  userDetailError,
  deleteUser,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const defaultUserValues = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
  };

  const [userValues, setUserValues] = useState(defaultUserValues);
  const [shouldOpenConfirmationModal, setShouldOpenConfirmationModal] =
    useState(false);
  const [shouldOpenDeleteModal, setShouldOpenDeleteModal] = useState(false);

  useEffect(() => {
    getUserDetail(id);
  }, [getUserDetail, id]);

  useEffect(() => {
    if (userDetail) {
      const { id, first_name, last_name, email } = userDetail;
      setUserValues({ id, first_name, last_name, email });
    }
  }, [userDetail]);

  const Modal = ({ message }) => (
    <ModalDialog
      open={shouldOpenConfirmationModal || shouldOpenDeleteModal}
      modalBody={<StyledMessage>{message}</StyledMessage>}
      onConfirm={() => navigate("/")}
      confirmText={"Aceptar"}
    />
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserValues({
      ...userValues,
      [name]: value,
      id: userDetail.id,
    });
  };

  const handleSumitData = () => {
    updateUser(userValues.id, userValues);
    if (userDetailError === null && userValues !== null) {
      setShouldOpenConfirmationModal(true);
    }
  };

  const handleDeleteUser = () => {
    deleteUser(userValues.id);
    if (userDetailError === null && userValues !== null) {
      setShouldOpenDeleteModal(true);
    }
  };

  return !userDetail ? (
    <div>Cargando</div>
  ) : (
    <>
      {shouldOpenConfirmationModal && (
        <Modal message={"Se ha actualizado con exito"} />
      )}
      {shouldOpenDeleteModal && <Modal message={"Se ha Borrado con exito"} />}
      <UserDetailForm
        userDetail={userDetail}
        handleInputChange={handleInputChange}
        handleSumitData={handleSumitData}
        handleDeleteUser={handleDeleteUser}
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  userDetail: userDataSelect,
  userDetailError: userDataErrorSelect,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetail: (id) => dispatch(getUserDetail(id)),
  updateUser: (userId, userData) => dispatch(updateUser(userId, userData)),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
