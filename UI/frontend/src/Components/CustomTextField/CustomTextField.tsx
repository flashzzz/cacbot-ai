import { TextField, TextFieldProps, styled } from "@mui/material";

export const CustomTextField = styled((props: TextFieldProps) => (
  <TextField fullWidth {...props} />
))(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    padding: "8px 13px",
    fontSize: "0.8rem",
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
