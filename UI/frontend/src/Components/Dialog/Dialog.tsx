import React from "react";
import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ICustomDialog {
  open: boolean;
  width: "md" | "lg" | "sm";
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const CustomDialog: React.FC<ICustomDialog> = (props) => {
  const { open, width, onClose, title, children } = props;
  return (
    <Dialog open={open} onClose={onClose} maxWidth={width}>
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
