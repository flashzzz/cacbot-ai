import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CustomTextField } from "../../Components/CustomTextField/CustomTextField";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

export const Login: React.FC = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        minWidth: "30%",
        maxWidth: "30%",
        width: "30%",
        height: "auto",
        padding: "3rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
        mt: "10%",
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight={"bold"}>
          Login
        </Typography>
      </Box>
      <Box width={"100%"}>
        <Grid container direction={"column"} spacing={3}>
          <Grid item xs={12} lg={12} display={"flex"} flexDirection={"column"}>
            <Typography>Username</Typography>
            <CustomTextField />
          </Grid>
          <Grid item xs={12} lg={12} display={"flex"} flexDirection={"column"}>
            <Typography>Password</Typography>
            <CustomTextField />
          </Grid>
          <Grid item xs={12} lg={12} display={"flex"} flexDirection={"column"}>
            <Button
              endIcon={<LoginRoundedIcon />}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
