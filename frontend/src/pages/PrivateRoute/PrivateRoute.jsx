import jwt_decode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token ? jwt_decode(token) : false;
  const isTokenExpired = isAuthenticated
    ? isAuthenticated.exp < Date.now() / 1000
    : true;

  const handleAlert = () => {
    localStorage.setItem("checkError", "true");
  };

  return isAuthenticated && !isTokenExpired ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" />
      {handleAlert()}
    </>
  );
};

export default PrivateRoute;
