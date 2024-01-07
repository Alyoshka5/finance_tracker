import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material';

export default function PageContainer() {
    const theme = useTheme();

    return (
        <Box
            backgroundColor={theme.palette.primary.main}
            color={theme.palette.primary.contrastText}
            fontFamily={theme.typography.fontFamily}
            height='100vh'
        >
            <Outlet />
        </Box>
    );
}