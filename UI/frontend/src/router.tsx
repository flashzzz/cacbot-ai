/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Loadable from "./Components/Layout/Loadable/Loadable";
import { AuthLayout } from "./Components/Layout/AuthLayout";

const LazyMainLayout = Loadable(
  lazy(() =>
    import("./Components/Layout/MainLayout").then(({ MainLayout }) => ({
      default: MainLayout,
    }))
  )
);

const LazyAuthLayout = Loadable(
  lazy(() =>
    import("./Components/Layout/AuthLayout").then(({ AuthLayout }) => {
      return {
        default: AuthLayout,
      };
    })
  )
);

const LazyHero = Loadable(
  lazy(() =>
    import("./Customers/Hero/Hero").then(({ Hero }) => ({
      default: Hero,
    }))
  )
);

const LazyUploadDocuments = Loadable(
  lazy(() =>
    import("./Customers/UploadDocuments/UploadDocuments").then(
      ({ UploadDocuments }) => ({
        default: UploadDocuments,
      })
    )
  )
);

const LazyLoginLayout = Loadable(
  lazy(() =>
    import("./Customers/authentication/Login").then(({ Login }) => ({
      default: Login,
    }))
  )
);

const LazyForgotPassword = Loadable(
  lazy(() =>
    import("./Customers/authentication/ForgetPassword").then(({ ForgotPassword }) => ({
      default: ForgotPassword,
    }))
  )
);

export const Router = [
  {
    path: "/",
    exact: true,
    element: <LazyHero />,
  },
  {
    path: "/main",
    exact: true,
    element: <LazyMainLayout />,
    children: [
      {
        path: "/main/upload",
        exact: true,
        element: <LazyUploadDocuments />,
      },
      {
        path: "/main/playground",
        exact: true,
        element: <LazyUploadDocuments />,
      },
    ],
  },
  {
    path: "/auth",
    exact: true,
    element: <LazyAuthLayout />,
    children: [
      {
        path: "/auth/login",
        exact: true,
        element: <LazyLoginLayout />,
      },
      {
        path: "/auth/forgot-password",
        exact: true,
        element: <LazyForgotPassword />,
      },
    ],
  },
];
