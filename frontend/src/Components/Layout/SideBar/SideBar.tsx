import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, ListItemIcon, Paper, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FastForwardIcon from "@mui/icons-material/FastForward";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const drawerWidth = "250px";

export const SideBar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", backgroundColor: "black" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          bgColor: "black",
          flexShrink: 0,
          "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper ": {
            backgroundColor: "unset",
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "black",
            // borderRight: "1px solid red"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar /> */}
        <Paper
          sx={{
            borderRadius: 4,
            py: 4,
            backgroundColor: "dimgray",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "1vh",
            mt: 2,
            background: "linear-gradient(183deg, #6d28b4, #988f8f)",
            width: "90%",
            margin: "4vh auto",
          }}
        >
          <Typography
            sx={{
              ml: 2,
            }}
          >
            Next up
          </Typography>
          <Typography
            sx={{
              ml: 2,
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
              color: "white",
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
        <Divider />
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
                  gap: "2vh",
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
                    sx={{
                      color: "white",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Upload Document"
                  className="list_item_text"
                  sx={{
                    color: "white",
                    my: 0.5,
                    ".MuiListItemText-primary": {
                      fontSize: 16,
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
            <NavLink to="/playground" className="link_text">
              <ListItemButton
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  transition: "all 0.5s ease-in-out",
                  display: "flex",
                  gap: "2vh",
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
                    sx={{
                      color: "white",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Playground"
                  sx={{
                    color: "white",
                    my: 0.5,
                    ".MuiListItemText-primary": {
                      fontSize: 16,
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
              onClick={() => navigate("/playground")}
            >
              <ListItemButton
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  transition: "all 0.5s ease-in-out",
                  display: "flex",
                  gap: "2vh",
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
                    sx={{
                      color: "white",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Tutorial"
                  sx={{
                    color: "white",
                    my: 0.5,
                    ".MuiListItemText-primary": {
                      fontSize: 16,
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
            <NavLink to="/profile" className="link_text">
              <ListItemButton
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  transition: "all 0.5s ease-in-out",
                  display: "flex",
                  gap: "2vh",
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
                    sx={{
                      color: "white",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="My Account"
                  sx={{
                    color: "white",
                    my: 0.5,
                    ".MuiListItemText-primary": {
                      fontSize: 16,
                      letterSpacing: "0.5px",
                      fontWeight: "semi",
                    },
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};
