import React from "react";
import { Box, Typography } from "@mui/material";
import { AiFillFilePdf } from "react-icons/ai";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

interface IDisplayUploadedFilesProps {
  files: File[];
}

export const DisplayUploadedFiles: React.FC<IDisplayUploadedFilesProps> = (
  props
) => {
  const { files } = props;

  if (files) {
    return files.map((file, index) => {
      const nameWithoutExtension = file.name.split(".")[0];
      const extension = file.name.split(".")[1];
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
            mt: 1,
          }}
        >
          {extension === "pdf" ? (
            <AiFillFilePdf
              color={"red"}
              size={"4vh"}
              style={{
                marginRight: "15px",
              }}
            />
          ) : (
            <TextSnippetIcon
              color={"primary"}
              fontSize={"large"}
              sx={{
                marginRight: "10px",
              }}
            />
          )}
          <Typography variant="body1" color={"grey"}>
            {nameWithoutExtension}
          </Typography>
        </Box>
      );
    });
  }

  return <></>;
};
