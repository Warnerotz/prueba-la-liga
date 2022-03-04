import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { StyledMessage } from "./UserDetail.styles";
import { userDataSelect } from "../../store/userDetail/userDetail.selector";
import { getUserDetail } from "../../store/userDetail/userDetail.actions";
import UserDetailForm from "../../components/userDetailForm/userDetailForm";
import ModalDialog from "../../components/modalDialog/modalDialog";

function UserDetail({ getUserDetail, userDetail }) {
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

  useEffect(() => {
    getUserDetail(id);
  }, [getUserDetail, id]);

  useEffect(() => {
    if (userDetail) {
      const { id, first_name, last_name, email } = userDetail;
      setUserValues({ id, first_name, last_name, email });
    }
  }, [userDetail]);

  const ConfirmationModal = () => (
    <ModalDialog
      open={shouldOpenConfirmationModal}
      modalBody={<StyledMessage>Se ha actualizado con exito</StyledMessage>}
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

  return !userDetail ? (
    <div>Cargando</div>
  ) : (
    <>
      {shouldOpenConfirmationModal && <ConfirmationModal />}
      <UserDetailForm
        userDetail={userDetail}
        handleInputChange={handleInputChange}
        setShouldOpenConfirmationModal={setShouldOpenConfirmationModal}
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  userDetail: userDataSelect,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetail: (id) => dispatch(getUserDetail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
