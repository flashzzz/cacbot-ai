/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";

interface IAuthorisedRoute {
  children: React.ReactNode;
}

export const AuthorisedRoute: React.FC<IAuthorisedRoute> = (props) => {
  const { children } = props;
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};
