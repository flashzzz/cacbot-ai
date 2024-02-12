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
import SnackBar from "../../Components/SnackBar/SnackBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Playground = () => {
  const [message, setMessage] = React.useState("");
  const [messageArray, setMessageArray] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [snackBar, setSnackBar] = React.useState<boolean>(true);

  const handlechange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // const handleClearChat = () => {
  //   setMessageArray([]);
  // };

  const handleClick = async () => {
    if (message.length === 0) {
      return;
    }
    setMessageArray((prev) => {
      return [...prev, message];
    });
    setMessage("");

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
      return toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
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
                height: "65vh",
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
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                      sx={{
                        color: "white",
                        padding: "25px 15px",
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
                  {loading ? (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress
                        thickness={6}
                        sx={{
                          color: "#9722E8",
                        }}
                      />
                    </Box>
                  ) : (
                    <NearMeIcon
                      onClick={handleClick}
                      sx={{
                        cursor: "pointer",
                        p: "6px",
                        borderRadius: 2,
                        color: message.length !== 0 ? "#9722E8" : "grey",
                        ":hover": {
                          backgroundColor:
                            message.length !== 0 ? "#3a3939" : "",
                        },
                        transition: "all 0.2s linear",
                        fontSize: "3rem",
                      }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <ToastContainer />
      </StandardCard>
    </PageContainer>
  );
};
