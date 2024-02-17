import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

interface ILoadingDialogProps {
  open: boolean;
}

export const LoadingDialog: React.FC<ILoadingDialogProps> = (props) => {
  return (
    <Dialog open={props.open} aria-describedby="alert-dialog-description">
      <DialogTitle display={"flex"} justifyContent={"center"} sx={{ pb: 0 }}>
        <CircularProgress thickness={5} color="warning" size={32} />
      </DialogTitle>
      <Stack
        direction="row"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ px: 2 }}
      >
        <DialogContent id="alert-dialog-description" sx={{ px: 1 }}>
          <Typography variant="h6" fontWeight={"500"} color={"warning"}>
            Hold On! We are Uploading your data...
          </Typography>
        </DialogContent>
      </Stack>
    </Dialog>
  );
};
