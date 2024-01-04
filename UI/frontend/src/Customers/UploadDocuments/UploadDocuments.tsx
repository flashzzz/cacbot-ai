/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { FileUpload } from "../../Components/FileUpload/FileUpload";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { FcLink } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FcBrokenLink } from "react-icons/fc";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { CustomTextField } from "../../Components/CustomTextField/CustomTextField";
import { StandardCard } from "../../Components/StandardCard/StandardCard";

export const UploadDocuments: React.FC = () => {
  const [pdfLink, setPdfLink] = React.useState<string>("");
  const [pdfLinkArray, setpdfLinkArray] = React.useState<string[]>([]);
  const [normalLink, setNormalLink] = React.useState<string>("");
  const [normalLinkArray, setNormalLinkArray] = React.useState<string[]>([]);

  const handlePdfLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfLink(e.target.value);
  };

  const handleAddPdfLink = () => {
    setpdfLinkArray([...pdfLinkArray, pdfLink]);
    setPdfLink("");
  };

  const handleNormalLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNormalLink(e.target.value);
  };

  const handleAddNormalLink = () => {
    setNormalLinkArray([...normalLinkArray, normalLink]);
    setNormalLink("");
  };

  return (
    <PageContainer title="Upload Content" description="upload content page">
      <StandardCard sx={{
        background: "linear-gradient(120deg, #e2e2e2, #9a9ee0)",
      }}>
        <Box
          sx={{
            display: "flex",
            color: "black",
            gap: "5vw",
          }}
        >
          <Box
            sx={{
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "100%",
              
            }}
          >
            <Typography
              variant="h3"
              fontWeight={400}
              sx={{
                letterSpacing: 1,
              }}
            >
              Content Management
            </Typography>
            <Typography
              variant="body1"
              sx={{
                letterSpacing: 1,
                mt: 1,
              }}
            >
              Manage your documnets, sources and knowledge which our bot will
              use while talking to you.
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} lg={4}>
                <FileUpload />
              </Grid>

              <Grid item xs={12} sm={6} lg={4}>
                <Box>
                  <Typography
                    variant="h5"
                    letterSpacing={1}
                    fontWeight={"bold"}
                  >
                    Upload PDF's Link
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      mt: 2,
                      border: "1px solid grey",
                      padding: "2pc 1pc",
                      borderRadius: 2,
                      background: "rgb(250, 250, 250, 0.5)",                
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        width: "100%",
                      }}
                    >
                      <CustomTextField
                        placeholder="Enter PDF's link"
                        value={pdfLink}
                        fullWidth
                        onChange={handlePdfLinkChange}
                      />
                      <Button variant="contained" onClick={handleAddPdfLink}>
                        Add
                      </Button>
                    </Box>

                    {pdfLinkArray.length > 0 && (
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h6">Files</Typography>
                        {pdfLinkArray.map((link) => {
                          return (
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"flex-start"}
                              gap={"10px"}
                            >
                              <FcLink color="blue" size="4vh" />
                              <Link to={`${link}`} className="pdf_link">
                                <Typography variant="body1">{link}</Typography>
                              </Link>
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} lg={4}>
                <Box>
                  <Typography
                    variant={"h5"}
                    letterSpacing={1}
                    fontWeight={"bold"}
                  >
                    Upload Document links
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      mt: 2,
                      border: "1px solid grey",
                      padding: "2pc 1pc",
                      borderRadius: 2,
                      background: "rgb(250, 250, 250, 0.5)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        width: "100%",
                      }}
                    >
                      <CustomTextField
                        placeholder="Enter link"
                        value={normalLink}
                        fullWidth
                        onChange={handleNormalLinkChange}
                      />
                      <Button variant="contained" onClick={handleAddNormalLink}>
                        Add
                      </Button>
                    </Box>

                    {normalLinkArray.length > 0 && (
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h6">Files</Typography>
                        {normalLinkArray.map((link) => {
                          return (
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"flex-start"}
                              gap={"10px"}
                            >
                              <FcBrokenLink color="blue" size="4vh" />
                              <Link to={`${link}`} className="pdf_link">
                                <Typography variant="body1">{link}</Typography>
                              </Link>
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} lg={2}>
                <Button
                  endIcon={<SendRoundedIcon />}
                  variant="contained"
                  size="large"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </StandardCard>
    </PageContainer>
  );
};
