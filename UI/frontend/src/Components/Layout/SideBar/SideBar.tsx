import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, ListItemIcon, Paper, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FastForwardIcon from "@mui/icons-material/FastForward";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { StandardCard } from "../../StandardCard/StandardCard";

const drawerWidth = "250px";

export const SideBar = () => {
  const navigate = useNavigate();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        height: "100vh",
        flexShrink: 0,
        "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
          backgroundColor: "unset",
          border: "none",
        },
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          maxWidth: drawerWidth,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <StandardCard
        sx={{
          justifyContent: "unset",
          height: "100%",
          background: "rgb(41 41 41 / 65%)",
          padding: "10px"
        }}
      >
        <Paper
          sx={{
            borderRadius: 4,
            p: "25px 0",
            backgroundColor: "dimgray",
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "1vh",
            mt: 2,
            background: "linear-gradient(183deg, #ffffff, #7446f0)",
            width: "100%",
            margin: "0vh auto 2vh",
            border: "none",
          }}
        >
          <Typography
            sx={{
              ml: "10px",
            }}
          >
            Next up
          </Typography>
          <Typography
            sx={{
              ml: "10px",
            }}
          >
            Add Bot to your website
          </Typography>
          <Button
            color="secondary"
            variant="outlined"
            sx={{
              ml: 2,
              px: 4,
              borderRadius: 50,
              fontSize: 15,
              color: "black",
              borderColor: "white",
              fontWeight: "bold",
              mt: "3vh",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
              },
            }}
          >
            Start
          </Button>
        </Paper>
        <List>
          <ListItem
            disablePadding
            sx={{
              mb: 2,
            }}
          >
            <NavLink to="/main/upload" className="link_text">
              <ListItemButton
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  transition: "all 0.5s ease-in-out",
                  display: "flex",
                  gap: "1vh",
                  px: "unset",
                  pl: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    "&": {
                      minWidth: 0,
                    },
                  }}
                >
                  <CloudUploadIcon
                    className="list_item_icon"
                    fontSize="small"
                    // sx={{
                    //   color: "#9722E8",
                    // }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Upload Document"
                  className="list_item_text"
                  sx={{
                    // color: "#9722E8",
                    my: 0.5,
                    ".MuiListItemText-primary": {
                      fontSize: 18,
                      letterSpacing: "0.8px",
                      // fontWeight: "bold",
                    },
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              mb: 2,
            }}
          >
            <NavLink to="/main/playground" className="link_text">
              <ListItemButton
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  transition: "all 0.5s ease-in-out",
                  display: "flex",
                  gap: "1vh",
                  px: "unset",
                  pl: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    "&": {
                      minWidth: 0,
                    },
                  }}
                >
                  <LocalFireDepartmentIcon
                    fontSize="small"
                    className="list_item_icon"
                    // sx={{
                    //   color: "white",
                    // }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Playground"
                  className="list_item_text"
                  sx={{
                    // color: "white",
                    my: 0.5,
                    ".MuiListItemText-primary": {
                      fontSize: 18,
                      letterSpacing: "0.5px",
                      fontWeight: "semi",
                    },
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              mb: 2,
            }}
          >
            <NavLink
              to="/tutorial"
              className="link_text"
              onClick={() => navigate("/main/playground")}
            >
              <ListItemButton
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  transition: "all 0.5s ease-in-out",
                  display: "flex",
                  gap: "1vh",
                  px: "unset",
                  pl: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    "&": {
                      minWidth: 0,
                    },
                  }}
                >
                  <FastForwardIcon
                    fontSize="small"
                    className="list_item_icon"
                    // sx={{
                    //   color: "white",
                    // }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Tutorial"
                  className="list_item_text"
                  sx={{
                    // color: "white",
                    my: 0.5,
                    ".MuiListItemText-primary": {
                      fontSize: 18,
                      letterSpacing: "0.5px",
                      fontWeight: "semi",
                    },
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              mb: 2,
            }}
          >
            <NavLink to="/auth/login" className="link_text">
              <ListItemButton
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  transition: "all 0.5s ease-in-out",
                  display: "flex",
                  gap: "1vh",
                  px: "unset",
                  pl: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    "&": {
                      minWidth: 0,
                    },
                  }}
                >
                  <AccountCircleIcon
                    fontSize="small"
                    className="list_item_icon"
                    // sx={{
                    //   color: "white",
                    // }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="My Account"
                  className="list_item_text"
                  sx={{
                    // color: "white",
                    my: 0.5,
                    ".MuiListItemText-primary": {
                      fontSize: 18,
                      letterSpacing: "0.5px",
                      fontWeight: "semi",
                    },
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </StandardCard>
    </Drawer>
  );
};
