import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const UserList = lazy(() => import("./pages/UserList/UserList"));
const NotFound = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const ROUTES = {
  HOME: "/",
  USER_DETAIL: "/user/:id",
  DEFAULT: "*",
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>cargando....</div>}>
        <Routes>
          <Route path={ROUTES.HOME} element={<UserList />} />
          <Route path={ROUTES.DEFAULT} element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
