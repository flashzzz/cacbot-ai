import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CustomTextField } from "../../Components/CustomTextField/CustomTextField";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Link } from "react-router-dom";
import { PageContainer } from "../../Components/PageContainer/PageContainer";

export const Login: React.FC = () => {
  return (
    <PageContainer title="login" description="this is login page">
      <Paper
        elevation={4}
        sx={{
          minWidth: "30%",
          maxWidth: "50%",
          width: "30%",
          height: "auto",
          padding: "3rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          // mt: "10%",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={"bold"}>
            CACBOT.AI
          </Typography>
        </Box>
        <Box width={"100%"}>
          <Grid container direction={"row"} spacing={3}>
            <Grid item xs={12} lg={12}>
              <Typography fontWeight={"bold"} variant="h6">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>Username</Typography>
              <CustomTextField />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>Password</Typography>
              <CustomTextField />
            </Grid>
            <Grid item xs={12} lg={6}></Grid>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Link to="/auth/forgot-password" style={linkStye}>
                <Typography variant="body2">Forgot Password?</Typography>
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              lg={12}
              display={"flex"}
              flexDirection={"column"}
            >
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
    </PageContainer>
  );
};

const linkStye = {
  textDecoration: "none",
  color: "#0024ff",
  "&:hover": {
    textDecoration: "underline",
  },
};
