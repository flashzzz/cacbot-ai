import { CssBaseline } from "@mui/material";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { Router } from "./router";

function App() {
  const routing = useRoutes(Router);
  return (
    <>
      <CssBaseline />
      {routing}
    </>
  );
}

export default App;
