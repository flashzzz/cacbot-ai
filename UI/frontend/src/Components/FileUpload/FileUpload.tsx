import { Box, Typography } from "@mui/material";
import { useState } from "react";
import BackupIcon from "@mui/icons-material/Backup";
import { AiFillFilePdf } from "react-icons/ai";
import { PageContainer } from "../PageContainer/PageContainer";

export const FileUpload: React.FC = () => {
  const [input, setInput] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      const newInput = [...input, ...filesArray];
      setInput(newInput);
    }
  };

  const files = input.map((file, index) => {
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
        <Typography variant="body1">{nameWithoutExtension}</Typography>
      </Box>
    );
  });

  return (
    <PageContainer
      title="Upload Documents"
      description="this is to upload documents"
    >
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
            }}
          >
            <input
              type="file"
              id="file_input"
              multiple
              accept="application/pdf"
              onChange={handleChange}
            />
            <label htmlFor="file_input" className="input_file_text">
              <BackupIcon
                sx={{
                  color: "white",
                  fontSize: "3rem",
                }}
              />
              Select a file
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
              <Typography variant="h6">Files</Typography>
              {files}
            </Box>
          )}
        </Box>
      </Box>
    </PageContainer>
  );
};
