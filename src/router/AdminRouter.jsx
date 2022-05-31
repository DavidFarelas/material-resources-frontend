import { Route, Routes } from "react-router-dom";
import CRUDusers from "../pages/admin/CRUDusers";
import PrivateRoutes from "./PrivateRoutes";

const AdminRouter = () => {
  let role = undefined;

  const userData = localStorage.getItem("userData");
  if (userData) {
    const userDataJson = JSON.parse(userData);
    role = userDataJson.users.ucid;
  }
  return (
    <>
      <div className="my-3 mx-5">
        <Routes>
          <Route
            path="/"
            element={<PrivateRoutes Component={CRUDusers} role={role} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default AdminRouter;
