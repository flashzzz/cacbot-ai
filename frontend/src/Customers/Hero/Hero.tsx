/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../Components/PageContainer/PageContainer";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <PageContainer title="CACBOT.AI" description="this is home page">
      <Box
        sx={{
          position: "relative",
          zIndex: "999",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
          height: "100vh",
        }}
      >
        <Typography
          variant="h2"
          className="home_heading"
          fontWeight={700}
          sx={{
            color: "white",
            textAlign: "center",
            margin: "2vh auto 0",
            width: "60%",
            "& .css-1xmz477-MuiTypography-root ": {
              fontSize: "unset",
            },
          }}
        >
          Empower Your Learning Journey with AI.
        </Typography>

        <Typography
          variant="h6"
          className="home_text"
          sx={{
            color: "white",
            textAlign: "center",
            margin: "5vh auto 0",
            width: "80%",
            letterSpacing: 0.8,
          }}
        >
          Boost your studies with CACBot: Your custom AI assistant. Upload
          docs, get instant answers. Simplify learning, ace exams effortlessly
        </Typography>
        <Typography
          variant="h6"
          className="home_text"
          sx={{
            color: "white",
            textAlign: "center",
            margin: "5vh auto 0",
            letterSpacing: 0.8,
            width: "80%",
          }}
          data-testid="cypress-text"
        >
          Once added to your website, CACBot will guide your organisations
          towards their right answers, and help them make the right decisions.
        </Typography>

        <img
          className="hero_image"
          alt="hero image"
          src="/src/assets/bg3.gif"
        />

        <Button
          color="secondary"
          variant="outlined"
          onClick={() => navigate("/main/upload")}
          sx={{
            borderRadius: 50,
            fontSize: 16,
            color: "white",
            borderColor: "white",
            fontWeight: "bold",
            mt: "6vh",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            },
          }}
        >
          Start your free trial
        </Button>
      </Box>
    </PageContainer>
  );
};
