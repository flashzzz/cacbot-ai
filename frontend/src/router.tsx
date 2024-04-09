/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Loadable from "./Layout/Loadable/Loadable";
import { AuthLayout } from "./Layout/AuthLayout";
import { AuthorisedRoute } from "./Customers/AuthorisedRoute/AuthorisedRoute";
import { Navigate } from "react-router-dom";

const LazyMainLayout = Loadable(
  lazy(() =>
    import("./Layout/MainLayout").then(({ MainLayout }) => ({
      default: MainLayout,
    }))
  )
);

const LazyAuthLayout = Loadable(
  lazy(() =>
    import("./Layout/AuthLayout").then(({ AuthLayout }) => {
      return {
        default: AuthLayout,
      };
    })
  )
);

const LazyPlaygroundLayout = Loadable(
  lazy(() =>
    import("./Layout/PlaygroundLayout").then(({ PlaygroundLayout }) => {
      return {
        default: PlaygroundLayout,
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

const LazySignUpLayout = Loadable(
  lazy(() =>
    import("./Customers/authentication/SignUp").then(({ SignUp }) => ({
      default: SignUp,
    }))
  )
);

const LazyForgotPassword = Loadable(
  lazy(() =>
    import("./Customers/authentication/ForgetPassword").then(
      ({ ForgotPassword }) => ({
        default: ForgotPassword,
      })
    )
  )
);

const LazyMyAccount = Loadable(
  lazy(() =>
    import("./Customers/MyAccount/MyAccount").then(({ MyAccount }) => ({
      default: MyAccount,
    }))
  )
);

const LazyCryptKey = Loadable(
  lazy(() =>
    import("./Customers/CryptKey/CryptKey").then(({ CryptKey }) => ({
      default: CryptKey,
    }))
  )
);

const LazyPlayground = Loadable(
  lazy(() =>
    import("./Customers/Playground/Playground").then(({ Playground }) => ({
      default: Playground,
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
    element: (
      <AuthorisedRoute>
        <LazyMainLayout />
      </AuthorisedRoute>
    ),
    children: [
      {
        path: "/main/upload",
        exact: true,
        element: (
          <AuthorisedRoute>
            <LazyUploadDocuments />
          </AuthorisedRoute>
        ),
      },
      {
        path: "/main/playground",
        exact: true,
        element: (
          <AuthorisedRoute>
            <LazyPlayground />
          </AuthorisedRoute>
        ),
      },
      {
        path: "/main/my-account",
        exact: true,
        element: (
          <AuthorisedRoute>
            <LazyMyAccount />
          </AuthorisedRoute>
        ),
      },
      {
        path: "/main/my-keys",
        exact: true,
        element: (
          <AuthorisedRoute>
            <LazyCryptKey />
          </AuthorisedRoute>
        ),
      },
    ],
  },
  {
    path: "/playground",
    exact: true,
    element: <LazyPlaygroundLayout />,
    children: [
      {
        path: "/playground",
        exact: true,
        element: <LazyPlayground />,
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
        path: "/auth/register",
        exact: true,
        element: <LazySignUpLayout />,
      },
      {
        path: "/auth/forgot-password",
        exact: true,
        element: <LazyForgotPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/page-not-found" />,
  },
];
