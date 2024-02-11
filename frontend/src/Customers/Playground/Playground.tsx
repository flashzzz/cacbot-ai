/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { StandardCard } from "../../Components/StandardCard/StandardCard";
import arnoux from "../../assets/Screenshot 2024-02-11 170048.png";
import FeatherIcon from "feather-icons-react";
import { CustomChatTextField } from "../../Components/TextField/CustomChatTextField";

export const Playground = () => {
  const [question, setQuestion] = React.useState("");

  const handlechange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleClick = () => {
    alert(question);
    setQuestion("");
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
          {/* <Box
            sx={{
              width: "200px",
              height: "200px",
              boxSizing: "border-box",
            }}
          >
            <img
              src={arnoux}
              alt="logo"
              style={{ width: "100%", height: "100%" }}
            />
          </Box> */}
          <Typography variant="body1" fontWeight={"bold"} color="secondary">
            Ask Questions related to your files uploaded here
          </Typography>
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
            value={question}
            onChange={handlechange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    startIcon={<FeatherIcon icon="send" />}
                    variant="contained"
                    onClick={handleClick}
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
