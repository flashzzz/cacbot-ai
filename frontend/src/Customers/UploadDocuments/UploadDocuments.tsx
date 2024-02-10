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
import axios from "axios";
import { AiFillFilePdf } from "react-icons/ai";
import BackupIcon from "@mui/icons-material/Backup";
import { api } from "../../api/api";
// import { env } from 'node:process';

export const UploadDocuments: React.FC = () => {
  const [pdfLink, setPdfLink] = React.useState<string>("");
  const [pdfLinkArray, setpdfLinkArray] = React.useState<string[]>([]);
  const [normalLink, setNormalLink] = React.useState<string>("");
  const [normalLinkArray, setNormalLinkArray] = React.useState<string[]>([]);
  const [documentArray, setDocumentArray] = React.useState<File[]>([]);

  const handlePdfLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfLink(e.target.value);
  };

  const handleAddPdfLink = () => {
    if (pdfLink === "") {
      alert("Please enter a link");
    } else if (pdfLinkArray.includes(pdfLink)) {
      alert("Link already exists");
    } else {
      setpdfLinkArray([...pdfLinkArray, pdfLink]);
      setPdfLink("");
    }
  };

  const handleNormalLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNormalLink(e.target.value);
  };

  const handleAddNormalLink = () => {
    if (normalLink === "") {
      alert("Please enter a link");
    } else if (normalLinkArray.includes(normalLink)) {
      alert("Link already exists");
    } else {
      setNormalLinkArray([...normalLinkArray, normalLink]);
      setNormalLink("");
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      if (documentArray.includes(filesArray[0])) {
        alert("File already exists");
      } else {
        const newInput = [...documentArray, ...filesArray];
        setDocumentArray(newInput);
      }
    }
  };

  const files = documentArray.map((file, index) => {
    const nameWithoutExtension = file.name.split(".")[0];
    return (
      <Box
        key={index}
        sx={{
          width: "100%",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <AiFillFilePdf color="red" size="4vh" style={{ marginLeft: "2vh" }} />
        <Typography variant="body1" color={"grey"}>
          {nameWithoutExtension}
        </Typography>
      </Box>
    );
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = [...pdfLinkArray, ...normalLinkArray, ...documentArray];
    const formData = new FormData();
    documentArray.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });

    setpdfLinkArray([]);
    setNormalLinkArray([]);
    setDocumentArray([]);

    await api
      .post(`/main/uploads/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alert("PDF links uploaded successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Error uploading PDF links");
      });
  };

  return (
    <PageContainer title="Upload Content" description="upload content page">
      <StandardCard
        sx={{
          color: "#9722E8",
          justifyContent: "unset",
        }}
      >
        <form onSubmit={handleSubmit}>
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
                  color: "#9722E8",
                }}
              >
                Content Management
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  letterSpacing: 1,
                  mt: 1,
                  color: "white",
                }}
              >
                Manage your documents, sources and knowledge which our bot will
                use while talking to you.
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} lg={4}>
                  <Box
                    sx={{
                      // border: "1px solid grey",
                      height: "auto",
                    }}
                  >
                    <Typography
                      variant="h5"
                      letterSpacing={1}
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Upload PDFs
                    </Typography>
                    <Box
                      sx={{
                        border: "1px solid grey",
                        mt: "10px",
                        padding: "1pc",
                        borderRadius: "5px",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          background: "inherit",
                        }}
                      >
                        <input
                          type="file"
                          id="file_input"
                          multiple
                          accept="application/pdf"
                          onChange={handlePdfChange}
                        />
                        <label htmlFor="file_input" className="input_file_text">
                          <BackupIcon
                            sx={{
                              color: "white",
                              fontSize: "3rem",
                            }}
                          />
                          Select files
                        </label>
                      </Box>

                      {files.length > 0 && (
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h6" color={"darkgrey"}>
                            Files
                          </Typography>
                          {files}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} lg={4}>
                  <Box>
                    <Typography
                      variant="h5"
                      letterSpacing={1}
                      fontWeight={"bold"}
                      color={"white"}
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
                        background: "inherit",
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
                          name="username"
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
                          <Typography variant="h6" color={"darkgrey"}>
                            Files
                          </Typography>
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
                                  <Typography variant="body1">
                                    {link}
                                  </Typography>
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
                      color={"white"}
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
                        background: "inherit",
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
                          placeholder="Enter Document's link"
                          value={normalLink}
                          fullWidth
                          onChange={handleNormalLinkChange}
                        />
                        <Button
                          variant="contained"
                          onClick={handleAddNormalLink}
                        >
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
                          <Typography variant="h6" color={"darkgrey"}>
                            Files
                          </Typography>
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
                                  <Typography variant="body1">
                                    {link}
                                  </Typography>
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
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </form>
      </StandardCard>
    </PageContainer>
  );
};
