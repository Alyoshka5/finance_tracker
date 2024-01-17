import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material';
import NavBar from './NavBar';

export default function PageContainer() {
    const theme = useTheme();

    return (
        <Box
            backgroundColor={theme.palette.primary.main}
            color={theme.palette.primary.contrastText}
            fontFamily={theme.typography.fontFamily}
            minHeight='100vh'
            display='flex'
            flexDirection='column'
        >
            <NavBar />
            <Outlet />
        </Box>
    );
}