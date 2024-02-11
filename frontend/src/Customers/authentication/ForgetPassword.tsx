import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CustomTextField } from "../../Components/TextField/CustomTextField";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import { useNavigate } from "react-router-dom";

export const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
  return (
    <PageContainer
      title="Forgot Password"
      description="this is forgot password page"
    >
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
          bgcolor: "#ffffff29",
          borderRadius: "1rem",
          backdropFilter: "blur(50px)",
        }}
      >
        <Box>
          <Typography variant="h4" color={"white"} fontWeight={"bold"}>
            CACBOT.AI
          </Typography>
        </Box>
        <Box width={"100%"}>
          <Grid container direction={"row"} spacing={3}>
            <Grid item xs={12} lg={12}>
              <Typography variant="h6" fontWeight={"bold"}>
                Forgot Password
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>Username</Typography>
              <CustomTextField />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>OTP</Typography>
              <CustomTextField />
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              display={"flex"}
              flexDirection={"column"}
            >
              <Button
                startIcon={<KeyboardReturnRoundedIcon />}
                variant="contained"
                color={"primary"}
                onClick={() => navigate("/auth/login")}
              >
                Return to Login
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              display={"flex"}
              flexDirection={"column"}
            >
              <Button
                endIcon={<LoginRoundedIcon />}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Paper>
    </PageContainer>
  );
};
