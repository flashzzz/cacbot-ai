import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Header = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "black",
        position: "relative",
        zIndex: 9999,
        width: "100%",
      }}
    >
      <AppBar
        component="div"
        sx={{
          width: "100%",
        }}
        position="static"
        color="primary"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: "black",
            gap: 5,
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 0, color: "white" }}>
            CACBOT.AI
          </Typography>
          <Button
            color="secondary"
            variant="outlined"
            sx={{
              borderRadius: 50,
              fontSize: 12,
              color: "white",
              borderColor: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
              },
            }}
          >
            My Account
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
