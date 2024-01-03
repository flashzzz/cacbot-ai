import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar/SideBar";

export const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        // overflow: "hidden",
        width: "100%",
        // gap: "0.5vw",
        
      }}
    >
      <SideBar />
      <Box sx={{ minHeight: "calc(100vh - 170px)", width: "100%", backgroundColor: "black" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
