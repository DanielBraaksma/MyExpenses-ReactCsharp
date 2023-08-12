import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectIsAuth } from "../slices/userSlice";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }: any) => {
    const isAuth = useSelector(selectIsAuth)
    const token = localStorage.getItem("token");

    console.log("token from PrivateRoute: ", token);

  return (
    <>
      {isAuth || token ? ( children ) : (
      <Navigate to="/" replace />) }
    </>
  );
};

export default PrivateRoute;
