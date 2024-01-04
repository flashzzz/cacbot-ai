

import { Box, Button, Paper } from '@mui/material'
import React from 'react';

interface IUploadCardProps {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    children?: React.ReactNode;
}

const UploadCard: React.FC<IUploadCardProps> = (props) => {
    const { title, icon, onClick, children } = props;
  return (
    <Paper elevation={2}>
        {/* <Box>
            <TextField 
                sx={{
                ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                        padding: "6.5px 10px",
                        color: "black",
                    }
                }} 
            />
        </Box> */}
        <Button startIcon={icon} variant="contained" component="label" onClick={onClick}>
            {title}
        </Button>
    </Paper>
  )
}

export default UploadCard