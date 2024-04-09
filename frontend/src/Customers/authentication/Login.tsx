/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CustomTextField } from "../../Components/TextField/CustomTextField";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { ILogin } from "./interface/login";
import { useFormik } from "formik";
import { api } from "../../api/api";
import { ToastContent } from "../../helpers/Toastify";

export const linkStye = {
  // textDecoration: "none",
  color: "rgb(0 43 255)",
  "& :hover": {
    textDecoration: "underline",
  },
};

export const Login: React.FC<ILogin> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { handleChange, handleSubmit, handleBlur, values } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await api.post("/auth/login", values).then((res) => {
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("username", res.data.user.username);
          ToastContent(res.data.message, "success");
          navigate("/main/upload", {
            state: { from: location },
            replace: true,
          });
        });
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        ToastContent(errorMessage, "error");
      }
    },
  });
  return (
    <PageContainer title="Login" description="this is login page">
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
          bgcolor: "#ffffffff",
          borderRadius: "1rem",
          backdropFilter: "blur(50px)",
        }}
      >
        <Box>
          <Typography variant="h4" color={"secondary"} fontWeight={"bold"}>
            CACBOT.AI
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box width={"100%"}>
            <Grid container direction={"row"} spacing={3}>
              <Grid item xs={12} lg={12}>
                <Typography fontWeight={"bold"} variant="h6">
                  Login
                </Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography>Username</Typography>
                <CustomTextField
                  value={values.username}
                  name="username"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  data-testid="cypress-username"
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography>Password</Typography>
                <CustomTextField
                  value={values.password}
                  type="password"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  data-testid="cypress-password"
                />
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
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} lg={4}></Grid>
              <Grid
                item
                xs={12}
                lg={8}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Typography variant="body1">
                  Didn't have a account?{" "}
                  <Link to="/auth/register" style={linkStye}>
                    {" "}
                    Sign Up{" "}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Paper>
    </PageContainer>
  );
};
