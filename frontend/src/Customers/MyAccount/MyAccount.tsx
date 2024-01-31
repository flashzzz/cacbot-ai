import React from "react";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { StandardCard } from "../../Components/StandardCard/StandardCard";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import profileImage from "../../assets/uchiha.jpg";
import defaultImage from "../../assets/defaultImage.jpg";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomSelect } from "../../Components/CustomSelect/CustomSelect";
import { user_status } from "../../constants/constant";

export const MyAccount = () => {
  const [file, setFile] = React.useState<string | null>(profileImage);

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

  const [userStatus, setUserStatus] = React.useState<string>("Active");

  return (
    <PageContainer title="My Account" description="this is my account page">
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
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontSize: "1.5rem",
                letterSpacing: "0.05rem",
              }}
            >
              Abhisek Kumar Singh
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <EmailIcon sx={{ mr: 1 }} color="primary" />
              {":"}
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  letterSpacing: "0.05rem",
                  color: "white",
                }}
              >
                bahdgcg566@gmail.com
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
          This status will be displayed on your profile after you publish it.
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
      </StandardCard>
    </PageContainer>
  );
};
