import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar/SideBar";

export const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        margin: "auto",
        paddingX: "1rem",
      }}
    >
      <SideBar />
      <Box
        sx={{
          minHeight: "calc(100vh - 170px)",
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
