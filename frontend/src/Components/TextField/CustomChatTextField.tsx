import { TextField, TextFieldProps, styled } from "@mui/material";

export const CustomChatTextField = styled((props: TextFieldProps) => (
  <TextField fullWidth {...props} placeholder="Enter your Prompt here" />
))(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    padding: "18px",
    fontSize: "1rem",
    color: "white",
    fontWeight: "550",
  },
  color: theme.palette.grey[800],
  backgroundColor: theme.palette.grey[700],
  borderRadius: "25px",
  letterSpacing: "0.01071em",
  "& input[type=number]::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "::placeholder": {
    color: theme.palette.grey[900],
    opacity: 1,
  },
}));
