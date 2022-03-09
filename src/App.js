import { Suspense, lazy, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";

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

export default connect()(App);
