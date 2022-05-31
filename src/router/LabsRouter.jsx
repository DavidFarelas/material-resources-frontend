import { Route, Routes } from "react-router-dom";
import MAReq from "../pages/jefeArea/MAReq";
import PrivateRoutes from "./PrivateRoutes";

const LabsRouter = () => {
  let role = undefined;

  const userData = localStorage.getItem("userData");
  if (userData) {
    const userDataJson = JSON.parse(userData);
    role = userDataJson.users.ucid;
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoutes Component={MAReq} role={role} />}
        />
      </Routes>
    </>
  );
};

export default LabsRouter;
