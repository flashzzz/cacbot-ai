/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { StandardCard } from "../../Components/StandardCard/StandardCard";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import profileImage from "../../assets/uchiha.jpg";
import defaultImage from "../../assets/defaultImage.jpg";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomSelect } from "../../Components/CustomSelect/CustomSelect";
import { user_status } from "../../constants/constant";
import { api, logOut } from "../../api/api";
import { getUser } from "../../helpers/getUser";
import { IUserProfile } from "./interface";
import { ToastContent } from "../../helpers";
import ErrorIcon from "@mui/icons-material/Error";

export const MyAccount = () => {
  const [file, setFile] = React.useState<string | null>(profileImage);
  const [userStatus, setUserStatus] = React.useState<string>("Active");
  const [userDetails, setUserDetails] = React.useState<IUserProfile | null>(
    null
  );
  const [loading, setLoading] = React.useState<boolean>(true);

  const { username } = getUser();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files;
    if (selectedImage && selectedImage.length > 0) {
      const file = selectedImage[0];
      const fileUrl = URL.createObjectURL(file);
      setFile(fileUrl);
    }
  };

  const handleDeleteAvatar = () => {
    setFile(null);
  };

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        await api.get(`/myProfile/${username}`).then((res) => {
          setUserDetails(res.data.data);
        });
        setLoading(false);
      } catch (error) {
        ToastContent("Error fetching user details", "error");
      }
    };
    fetchUserDetails();
  }, []);

  React.useEffect(() => {
    if (userDetails) {
      setUserStatus(userDetails.status);
    }
  }, []);

  return (
    <PageContainer title="My Account" description="this is my account page">
      {!loading &&
        (userDetails ? (
          <>
            <StandardCard heading="My Account">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Box
                  sx={{
                    width: "130px",
                    height: "130px",
                  }}
                >
                  <img
                    className="pfp"
                    src={file ? file : defaultImage}
                    alt="profile"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    flexDirection={"column"}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontSize: "1.5rem",
                        letterSpacing: "0.05rem",
                      }}
                    >
                      {userDetails ? (
                        userDetails.fullname
                      ) : (
                        <Skeleton
                          variant="text"
                          width={300}
                          height={50}
                          animation={"wave"}
                          sx={{
                            backgroundColor: "#201f1f",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "grey",
                        fontSize: "1rem",
                        letterSpacing: "0.05rem",
                      }}
                    >
                      {userDetails ? (
                        userDetails.username
                      ) : (
                        <Skeleton
                          variant="text"
                          width={150}
                          height={30}
                          animation={"wave"}
                          sx={{
                            backgroundColor: "#201f1f",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <EmailIcon sx={{ mr: 1 }} color="primary" />{" "}
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1rem",
                        letterSpacing: "0.05rem",
                        color: "white",
                      }}
                    >
                      {userDetails ? (
                        userDetails.email
                      ) : (
                        <Skeleton
                          variant="text"
                          width={200}
                          height={40}
                          animation={"wave"}
                          sx={{
                            backgroundColor: "#201f1f",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                    justifyContent={"center"}
                  >
                    <input
                      style={{ display: "none" }}
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                    />
                    <label htmlFor="file-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<EditIcon />}
                      >
                        Change Avatar
                      </Button>
                    </label>
                    <Button
                      variant="contained"
                      onClick={handleDeleteAvatar}
                      component="span"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Delete Avatar
                    </Button>
                  </Box>
                </Box>
              </Box>
            </StandardCard>

            <StandardCard heading="Current Status">
              <Typography variant="body1" sx={{ mb: 2 }} color={"#ff8a65"}>
                This status will be displayed on your profile after you publish
                it.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <CustomSelect
                    value={userStatus}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(event: SelectChangeEvent<any>) =>
                      setUserStatus(event.target.value)
                    }
                    sx={{ color: "white", border: "1px solid grey" }}
                  >
                    {user_status.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
              </Grid>

              <Button color="secondary" variant="contained" sx={{ mt: 2 }}>
                Save
              </Button>

              <Stack
                display={"flex"}
                direction="column"
                justifyContent="flex-start"
                sx={{ mt: 2 }}
              >
                <Button
                  color="error"
                  variant="outlined"
                  sx={{ mt: 4 }}
                  onClick={logOut}
                >
                  Log out
                </Button>
              </Stack>
            </StandardCard>
          </>
        ) : (
          <>
            <StandardCard heading="My Account" sx={{ minHeight: "95vh" }}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
              >
                <ErrorIcon color="error" fontSize="large" />
                <Typography variant="h5" color={"error"}>
                  Error on loading Profile{" "}
                </Typography>
              </Box>
            </StandardCard>
          </>
        ))}
    </PageContainer>
  );
};
