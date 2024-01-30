import { Box, Stack, Tooltip } from "@mui/material";
import React from "react";
import { IStandardTableActionsProps } from "./StandardTableActions.types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const StandardTableActions: React.FC<IStandardTableActionsProps> = (
  props
) => {
  const { onViewKey, onDeleteKey, onCopyKey, onViewKeyBoolean } = props;
  return (
    <Stack
      direction={"row"}
      spacing={1}
      sx={{
        cursor: "pointer",
      }}
    >
      {onViewKey && (
        <Box onClick={onViewKey}>
          {onViewKeyBoolean ? (
            <Tooltip title="View Key">
              <VisibilityOffIcon color="primary" />
            </Tooltip>
            
          ) : (
            <Tooltip title="Hide Key">
              <VisibilityIcon color="primary" />
            </Tooltip>
          )}
        </Box>
      )}
      {onDeleteKey && (
        <Box onClick={onDeleteKey}>
          <Tooltip title="Delete Key">
            <DeleteIcon color="error" />
          </Tooltip>
        </Box>
      )}
      {onCopyKey && (
        <Box onClick={onCopyKey}>
          <Tooltip title="Copy Key">
            <ContentPasteIcon color="primary" />
          </Tooltip>
        </Box>
      )}
    </Stack>
  );
};
