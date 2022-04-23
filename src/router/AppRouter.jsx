import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NoLoginNav from "../components/navs/NoLoginNav";
import AdminRouter from "./AdminRouter";
import { persistentLoginAction } from "../redux/usersDuck";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import PublicRoutes from "./PublicRoutes";
import LabsRouter from "./LabsRouter";

const AppRouter = () => {
  const dispatch = useDispatch();
  const userData = localStorage.getItem("userData");
  useEffect(() => {
    if (userData) {
      const userDataJson = JSON.parse(userData);
      if (userDataJson.users.name && userDataJson.users.ucid)
        dispatch(persistentLoginAction(userDataJson.users));
    } else {
      <Navigate to="/" />;
    }
  }, [userData, dispatch]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NoLoginNav />
                <PublicRoutes Component={LoginPage} />
              </>
            }
          />
          <Route
            path="admin/*"
            element={
              <>
                <NoLoginNav />
                <AdminRouter />
              </>
            }
          />
          <Route
            path="labs/*"
            element={
              <>
                <NoLoginNav />
                <LabsRouter />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
