/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { FcLink } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FcBrokenLink } from "react-icons/fc";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { CustomTextField } from "../../Components/TextField/CustomTextField";
import { StandardCard } from "../../Components/StandardCard/StandardCard";
import BackupIcon from "@mui/icons-material/Backup";
import { api } from "../../api/api";
import { ToastContent } from "../../helpers/Toastify";
import { LoadingDialog } from "../../Components/Dialog/LoadingDialog";
import { DisplayUploadedFiles } from "./DisplayUploadedFiles";

export const UploadDocuments: React.FC = () => {
  const [pdfLink, setPdfLink] = React.useState<string>("");
  const [pdfLinkArray, setpdfLinkArray] = React.useState<string[]>([]);
  const [normalLink, setNormalLink] = React.useState<string>("");
  const [normalLinkArray, setNormalLinkArray] = React.useState<string[]>([]);
  const [documentArray, setDocumentArray] = React.useState<File[]>([]);
  const [uploading, setUploading] = React.useState<boolean>(false);

  const handlePdfLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfLink(e.target.value);
  };

  const handleAddPdfLink = () => {
    if (pdfLink === "") {
      ToastContent("Please enter a link", "error");
    } else if (pdfLinkArray.includes(pdfLink)) {
      ToastContent("Link already exists", "warning");
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
      ToastContent("Please enter a link", "error");
    } else if (normalLinkArray.includes(normalLink)) {
      ToastContent("Link already exists", "warning");
    } else {
      setNormalLinkArray([...normalLinkArray, normalLink]);
      setNormalLink("");
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      const ext = filesArray[0].name.split(".").pop();
      if (ext !== "pdf" && ext !== "txt") {
        ToastContent("Please upload a pdf or txt file", "error");
      } else {
        const fileNames = documentArray.map((file) => file.name);
        const newFileName = filesArray[0].name;
        if (fileNames.includes(newFileName)) {
          //todo: correct this
          ToastContent("File already exists", "warning");
        } else {
          const newInput = [...documentArray, ...filesArray];
          setDocumentArray(newInput);
        }
      }
    }
  };

  const handleSubmitFiles = async () => {
    const formData = new FormData();
    if (
      pdfLinkArray.length === 0 &&
      normalLinkArray.length === 0 &&
      documentArray.length === 0
    ) {
      ToastContent("Please upload some files", "error");
      return;
    }

    const allLinksArray = {
      normal_links: [...normalLinkArray],
      pdf_links: [...pdfLinkArray],
    };

    try {
      formData.append("links", "{" + JSON.stringify(allLinksArray) + "}");
      documentArray.forEach((file, index) => {
        formData.append(`file-${index}`, file);
      });
      await api
        .post(`/main/uploads`, formData)
        .then((res) => {
          ToastContent(res.data.message, "success");
        })
        .catch((err) => {
          ToastContent(err.message, "error");
        });
    } catch {
      ToastContent("Error on Uploading Some files", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setUploading(true);
      // uploading files and links
      await handleSubmitFiles();
    } catch {
      ToastContent("Error on Uploading Some files", "error");
    } finally {
      setUploading(false);
      setpdfLinkArray([]);
      setNormalLinkArray([]);
      setDocumentArray([]);
    }
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
                        height: "auto",
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
                          accept="application/pdf , .pdf, .txt"
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
                      <DisplayUploadedFiles files={documentArray} />
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
                                    {link.slice(0, 35) + "..."}
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
                            flxWrap: "wrap",
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
                                    {link.slice(0, 35) + "..."}
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
                    data-button="cypress-button"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </form>
      </StandardCard>
      {uploading && <LoadingDialog open={uploading} />}
    </PageContainer>
  );
};
