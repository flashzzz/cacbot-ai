import { Box, Divider, Paper, PaperProps, Typography } from "@mui/material";

interface IStandardCardProps {
  sx?: PaperProps["sx"];
  heading?: string;
  children: React.ReactNode;
}
export const StandardCard: React.FC<IStandardCardProps> = (props) => {
  const { sx, children, heading } = props;

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        borderRadius: 2,
        padding: "20px",
        backgroundColor: "white",
        mt: "2vh",
        ...sx,
      }}
    >
      <Typography variant="h4" fontWeight={"bold"}>
        {heading}
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <Box width={"100%"}>{children}</Box>
    </Paper>
  );
};
