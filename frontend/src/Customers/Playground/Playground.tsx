/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { StandardCard } from "../../Components/StandardCard/StandardCard";
import arnoux from "../../assets/Screenshot 2024-02-11 170048.png";
import FeatherIcon from "feather-icons-react";
import { CustomChatTextField } from "../../Components/TextField/CustomChatTextField";
import { grey } from "@mui/material/colors";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import { api } from "../../api/api";

export const Playground = () => {
  const [message, setMessage] = React.useState("");
  const [messageArray, setMessageArray] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handlechange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = async () => {
    setMessageArray([...messageArray, message]);
    setMessage("");

    try {
      setLoading(true);
      await api.post("/playground", message, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        const response: string = res.data;
        setMessageArray([...messageArray, response]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Playground" description="this is playground">
      <StandardCard heading="Playground" sx={{ minHeight: "95vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {messageArray.length > 0 ? (
            <Box
              sx={{
                height: "75vh",
                overflow: "scroll",
                overflowX: "hidden",
                scrollBehavior: "smooth",
                width: "100%",
              }}
            >
              {messageArray.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
                      background: index % 2 === 0 ? "#2d2c2c" : "",
                      borderRadius: "10px",
                    }}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                      ml={3}
                    >
                      {index % 2 === 0 ? (
                        <PermIdentityOutlinedIcon color="primary" />
                      ) : (
                        <LocalFireDepartmentOutlinedIcon color="error" />
                      )}

                      <Typography
                        variant="body1"
                        fontWeight={"bold"}
                        sx={{
                          color: "white",
                          padding: "25px 15px",
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box
              display={"flex"}
              alignItems={"flex-start"}
              flexDirection={"column"}
            >
              <Typography
                variant="h2"
                fontWeight={"500"}
                className="heading_text"
              >
                Welcome, Abhisek
              </Typography>
              <Typography variant="h4" fontWeight={"400"} color={grey[700]}>
                Ask me anything from the files/links you have provided.
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "6%",
            left: "30%",
            width: "60%",
            margin: "auto",
          }}
        >
          <CustomChatTextField
            value={message}
            onChange={handlechange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    disabled={message.length === 0}
                    startIcon={<FeatherIcon icon="send" />}
                    variant="contained"
                    onClick={handleClick}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </StandardCard>
    </PageContainer>
  );
};
