/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface IAuthorisedRoute {
  children: React.ReactNode;
}

export const AuthorisedRoute: React.FC<IAuthorisedRoute> = (props) => {
  const { children } = props;
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};
