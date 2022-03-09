import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { createStructuredSelector } from "reselect";
import LoginComponent from "../../components/loginComponent/loginComponent";
import { getAuthToken } from "../../store/authUser/authUser.actions";
import { authTokenErrorSelect } from "../../store/authUser/authUser.selector";

function LoginPage({ getAuthToken }) {
  const defaultAuthData = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [authData, setAuthDataValues] = useState(defaultAuthData);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

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
    <LoginComponent
      handleInputChange={handleInputChange}
      handleSumitData={handleSumitData}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  authError: authTokenErrorSelect,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthToken: (email, password) => dispatch(getAuthToken(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
