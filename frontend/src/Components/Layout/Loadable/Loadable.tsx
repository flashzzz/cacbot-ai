import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<LinearProgress />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
