/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Typography,
} from "@mui/material";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { StandardCard } from "../../Components/StandardCard/StandardCard";
import { CustomChatTextField } from "../../Components/TextField/CustomChatTextField";
import { grey } from "@mui/material/colors";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import { api } from "../../api/api";
import Typewriter from "typewriter-effect";
import NearMeIcon from "@mui/icons-material/NearMe";
import { ToastContent } from "../../helpers/Toastify";
import { getUser } from "../../helpers/getUser";

export const Playground = () => {
  const [message, setMessage] = React.useState("");
  const [messageArray, setMessageArray] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { username } = getUser();

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleApiRequest = async (message: string) => {
    try {
      setLoading(true);
      await api
        .post("/playground", message, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const response: string = res.data;
          setMessageArray((prev) => {
            return [...prev, response];
          });
        });
    } catch (error: any) {
      const errorMessage = error;
      ToastContent(errorMessage.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message.length !== 0) {
      setMessageArray((prev) => {
        return [...prev, message];
      });
      setMessage("");
      handleApiRequest(message);
    }
  };

  const handleClick = () => {
    if (message.length === 0) {
      return;
    }
    setMessageArray((prev) => {
      return [...prev, message];
    });
    setMessage("");
    handleApiRequest(message);
  };

  return (
    <PageContainer title="Playground" description="this is playground">
      <StandardCard
        heading="Playground"
        sx={{ minHeight: "95vh", position: "relative" }}
      >
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
                height: "65vh",
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
                      width: "98%",
                      background: index % 2 === 0 ? "#2d2c2c" : "",
                      borderRadius: "10px",
                      marginBottom: 2,
                    }}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                      sx={{
                        color: "white",
                        padding: "10px 10px",
                      }}
                    >
                      {index % 2 === 0 ? (
                        <PermIdentityOutlinedIcon color="primary" />
                      ) : (
                        <LocalFireDepartmentOutlinedIcon color="error" />
                      )}

                      <Typography
                        variant="body1"
                        fontWeight={"bold"}
                        ml={2}
                        sx={{
                          color: "white",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {index % 2 === 0 ? (
                          item
                        ) : (
                          <Typewriter
                            options={{
                              delay: 10,
                              loop: false,
                              cursor: "",
                            }}
                            onInit={(typewriter) => {
                              typewriter.typeString(item).start();
                            }}
                          />
                        )}
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
                variant="h3"
                fontWeight={"500"}
                className="heading_text"
                data-testid="cypress-welcome"
              >
                Welcome, {username}
              </Typography>
              <Typography
                variant="h5"
                fontWeight={"400"}
                color={grey[700]}
                data-testid="cypress-text"
              >
                Ask me anything from the files/links you have provided.
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "3%",
            left: "20%",
            width: "60%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress
                className="send_button_icon_circle"
                thickness={5}
                sx={{
                  color: "#9722E8",
                }}
              />
            </Box>
          ) : (
            <NearMeIcon
              onClick={handleClick}
              className="send_button_icon"
              sx={{
                cursor: "pointer",
                p: "6px",
                borderRadius: 2,
                color: message.length !== 0 ? "#9722E8" : "grey",
                ":hover": {
                  backgroundColor: message.length !== 0 ? "#3a3939" : "",
                },
                transition: "all 0.2s linear",
                fontSize: "3rem",
              }}
            />
          )}
          <input
            value={message}
            onChange={handlechange}
            onKeyDown={handleKeyPress}
            style={{
              position: "relative",
            }}
            className="chat_input"
            placeholder="Enter your Prompt..."
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       {loading ? (
            //         <Box sx={{ display: "flex" }}>
            //           <CircularProgress
            //             thickness={6}
            //             sx={{
            //               color: "#9722E8",
            //             }}
            //           />
            //         </Box>
            //       ) : (
            //         <NearMeIcon
            //           onClick={handleClick}
            //           sx={{
            //             cursor: "pointer",
            //             p: "6px",
            //             borderRadius: 2,
            //             color: message.length !== 0 ? "#9722E8" : "grey",
            //             ":hover": {
            //               backgroundColor:
            //                 message.length !== 0 ? "#3a3939" : "",
            //             },
            //             transition: "all 0.2s linear",
            //             fontSize: "3rem",
            //           }}
            //         />
            //       )}
            //     </InputAdornment>
            //   ),
            // }}
          />
        </Box>
      </StandardCard>
    </PageContainer>
  );
};
