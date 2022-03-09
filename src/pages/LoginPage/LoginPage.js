import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { createStructuredSelector } from "reselect";
import LoginComponent from "../../components/loginComponent/loginComponent";
import ModalDialog from "../../components/modalDialog/modalDialog";
import { getAuthToken } from "../../store/authUser/authUser.actions";
import {
  authTokenErrorSelect,
  authTokenSelect,
} from "../../store/authUser/authUser.selector";
import { StyledMessage } from "./LoginPage.styles";

function LoginPage({ getAuthToken, authError, authToken }) {
  const defaultAuthData = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [authData, setAuthDataValues] = useState(defaultAuthData);
  const [shouldOpenFailModal, setShouldOpenFailModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (authToken) {
      navigate("/", { replace: true });
    }
  }, [navigate, authToken]);

  useEffect(() => {
    if (authError) {
      setShouldOpenFailModal(true);
    }
  }, [authError, setShouldOpenFailModal]);

  const Modal = ({ message }) => (
    <ModalDialog
      open={shouldOpenFailModal}
      modalBody={<StyledMessage>{message}</StyledMessage>}
      onConfirm={() => setShouldOpenFailModal(false)}
      confirmText={"Aceptar"}
    />
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuthDataValues({
      ...authData,
      [name]: value,
    });
  };
  const handleSumitData = () => {
    const { email, password } = authData;
    getAuthToken(email, password);
  };

  return (
    <>
      {shouldOpenFailModal && <Modal message="Email o contraseña incorrecta" />}
      <LoginComponent
        handleInputChange={handleInputChange}
        handleSumitData={handleSumitData}
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  authError: authTokenErrorSelect,
  authToken: authTokenSelect,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthToken: (email, password) => dispatch(getAuthToken(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
