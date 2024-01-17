import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FastForwardIcon from "@mui/icons-material/FastForward";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

interface MenuItems {
    link: string;
    listItemIcon: React.ReactElement;
    listItemText: string;
}

export const menuItems: MenuItems[] = [
    {
        link: "/main/upload",
        listItemIcon: <CloudUploadIcon />,
        listItemText: "Upload Data",
    },
    {
        link: "/main/playground",
        listItemIcon: <LocalFireDepartmentIcon />,
        listItemText: "Playground",
    },
    {
        link: "/main/tutorial",
        listItemIcon: <FastForwardIcon />,
        listItemText: "Tutorial",
    },
    {
        link: "/auth/login",
        listItemIcon: <AccountCircleIcon />,
        listItemText: "My Account",
    },
]