import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { Box, Button, ListItemIcon, Paper, Typography } from "@mui/material";

import { StandardCard } from "../../StandardCard/StandardCard";
import { menuItems } from "./SideBarTypes";

const drawerWidth = "250px";

export const SideBar = () => {
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
          padding: "10px",
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
              fontWeight: "bold",
            }}
          >
            Next up
          </Typography>
          <Typography
            sx={{
              ml: "10px",
              fontWeight: "bold",
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
          {menuItems.map((item) => {
            return (
              <ListItem
                disablePadding
                sx={{
                  mb: 2,
                }}
              >
                <NavLink to={item.link} className="link_text">
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
                      <Box className="list_item_icon">{item.listItemIcon}</Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.listItemText}
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
            );
          })}
        </List>
      </StandardCard>
    </Drawer>
  );
};
