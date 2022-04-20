import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
//import { useDispatch } from "react";
import LoginPage from "../pages/LoginPage";
import NoLoginNav from "../components/navs/NoLoginNav";

const AppRouter = () => {
  const userData = localStorage.getItem("userData");
  let userDataJson;
  if (userData) {
    userDataJson = JSON.parse(userData);
    //(userDataJson.user.name && userDataJson.user.role)
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NoLoginNav />
                <LoginPage />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
