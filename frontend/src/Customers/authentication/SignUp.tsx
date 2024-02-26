/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ISignUpProps } from "./interface/SignUp";
import { useFormik } from "formik";
import { api } from "../../api/api";
import { ToastContent } from "../../helpers";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { linkStye } from "./Login";
import { CustomTextField } from "../../Components/TextField/CustomTextField";

export const SignUp: React.FC<ISignUpProps> = () => {
  const navigate = useNavigate();

  const { handleChange, handleSubmit, handleBlur, values, errors } = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (values.fullName === "") {
        errors.fullName = "*Full name is required";
      } else if (values.username === "") {
        errors.username = "*Username is required";
      } else if (values.email === "") {
        errors.email = "*Email address is required";
      } else if (
        values.email !== "" &&
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          values.email
        ) === false
      ) {
        errors.email = "*Invalid email address";
      } else if (values.password === "") {
        errors.password = "*Required";
      } else if (values.password.length < 8) {
        errors.password = "*Password must be at least 8 characters";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "*Password must be same";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await api.post("/auth/signup", values).then((res) => {
          ToastContent(res.data.message, "success");
          navigate("/auth/login");
        });
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        ToastContent(errorMessage, "error");
      }
    },
  });

  return (
    <PageContainer title="Sign Up" description="this is sign-up page">
      <Paper
        elevation={4}
        sx={{
          minWidth: "30%",
          maxWidth: "50%",
          width: "30%",
          height: "auto",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
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
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={12} lg={12} sx={{ mb: 2 }}>
                <Typography fontWeight={"bold"} variant="h5">
                  Sign Up
                </Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography>Full Name</Typography>
                <CustomTextField
                  value={values.fullName}
                  name="fullName"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <Typography>Username</Typography>
                <CustomTextField
                  value={values.username}
                  type="text"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <Typography>Email</Typography>
                <CustomTextField
                  value={values.email}
                  type="email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
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
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <Typography>Confirm Password</Typography>
                <CustomTextField
                  value={values.confirmPassword}
                  type="text"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword}
                />
              </Grid>

              <Grid
                item
                xs={12}
                lg={12}
                display={"flex"}
                flexDirection={"column"}
              >
                <Button
                  //   endIcon={<LoginRoundedIcon />}
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Sign Up
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
                  mt: 1,
                }}
              >
                <Typography variant="body1">
                  Already have a account?{" "}
                  <Link to="/auth/login" style={linkStye}>
                    {" "}
                    Login{" "}
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
