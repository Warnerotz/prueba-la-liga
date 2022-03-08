import { Suspense, lazy, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Navigate, useLocation, useNavigate } from "react-router";
import { createStructuredSelector } from "reselect";
import { authTokenSelect } from "./store/authUser/authUser.selector";
import { userDataSelect } from "./store/userDetail/userDetail.selector";

const UserList = lazy(() => import("./pages/UserList/UserList"));
const NotFound = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const UserDetail = lazy(() => import("./pages/UserDetail/UserDetail"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));

const ROUTES = {
  HOME: "/",
  USER_DETAIL: "/users/:id",
  LOGIN: "/login",
  DEFAULT: "*",
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("lalal");
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [navigate]);

  return (
    <Suspense fallback={<div>cargando....</div>}>
      <Routes>
        <Route path={ROUTES.HOME} element={<UserList />} />
        <Route path={ROUTES.USER_DETAIL} element={<UserDetail />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.DEFAULT} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

const mapStateToProps = createStructuredSelector({
  authtoken: authTokenSelect,
  userList: userDataSelect,
});

export default connect(mapStateToProps)(App);
