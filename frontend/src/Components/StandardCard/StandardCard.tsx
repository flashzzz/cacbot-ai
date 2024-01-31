import { Box, Divider, Paper, PaperProps, Typography } from "@mui/material";
import React from "react";

interface IStandardCardProps {
  sx?: PaperProps["sx"];
  heading?: string;
  children: React.ReactNode;
  rightHeading?: React.ReactNode | string;
}
export const StandardCard: React.FC<IStandardCardProps> = (props) => {
  const { sx, children, heading, rightHeading } = props;

  const isNode = React.isValidElement(rightHeading);

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderRadius: 2,
        padding: "30px",
        backgroundColor: "rgb(41 41 41 / 85%)",
        my: 2,
        // minHeight: "100vh",
        ...sx,
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <Typography
          variant="h4"
          fontWeight={"500"}
          sx={{
            color: "#9722E8",
          }}
        >
          {heading}
        </Typography>
        {isNode && rightHeading}
        {!isNode && (
          <Typography variant="h4" fontWeight={"bold"}>
            {rightHeading}
          </Typography>
        )}
      </Box>

      {heading && (
        <Divider
          sx={{
            mt: 2,
            mb: 3,
            width: "100%",
            borderColor: "rgb(255 255 255 / 28%)",
          }}
        />
      )}
      <Box width={"100%"}>{children}</Box>
    </Paper>
  );
};
