import { Select, SelectProps, styled } from "@mui/material";


export const CustomSelect = styled((props: SelectProps) => (
    <Select fullWidth {...props} />
))(({ theme }) => ({
    "& .MuiSelect-outlined": {
        padding: "11px 14px",
        color: theme.palette.grey[400],
    },
}))