import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import bgCover from "../../assets/uchiha.jpg"

export const AuthLayout = () => {
    return (
        <Box sx={{
            position: "relative",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "url(" + bgCover + ") no-repeat center center",
        }}>
            <Outlet />
        </Box>
    )
}