import { TextField, TextFieldProps, styled } from "@mui/material";

export const CustomChatTextField = styled((props: TextFieldProps) => (
  <TextField fullWidth {...props} />
))(({ theme }) => ({
  "& .MuiFormControl-fullWidth": {
    width: "60%",
    borderRadius: "25px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "18px",
    fontSize: "1rem",
    color: "black",
    fontWeight: "550",
  },
  color: theme.palette.grey[800],
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  letterSpacing: "0.01071em",
  "& input[type=number]::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
}));
