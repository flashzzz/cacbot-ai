import { Alert, Box, Snackbar } from "@mui/material";
import React from "react";
import { ISnackBarProps } from "./interface";

const SnackBar: React.FC<ISnackBarProps> = (props) => {
  const { open, handleClose, severity, message, icon } = props;
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        key={"topright"}
      >
        <Alert severity={severity} icon={icon}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SnackBar;
