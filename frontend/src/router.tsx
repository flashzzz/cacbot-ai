/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Loadable from "./Components/Layout/Loadable/Loadable";

const LazyMainLayout = Loadable(
  lazy(() =>
    import("./Components/Layout/MainLayout").then(({ MainLayout }) => ({
      default: MainLayout,
    }))
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
    lazy(() => import("./Customers/UploadDocuments/UploadDocuments").then(({ UploadDocuments }) => ({
        default: UploadDocuments,
    })))
)

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
        }
    ]
  }
];
