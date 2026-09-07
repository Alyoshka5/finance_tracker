import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material';
import HeaderBar from './HeaderBar';
import NavBar from './NavBar';
import useAuth from '../hooks/useAuth';
import SiteHeader from './SiteHeader';

export default function PageContainer() {
    const theme = useTheme();
    const { auth } = useAuth();

    return (
        <Box
            backgroundColor={theme.palette.primary.main}
            color={theme.palette.primary.contrastText}
            fontFamily={theme.typography.fontFamily}
            minHeight='100vh'
            display='flex'
        >
            { auth.userId ? <NavBar /> :<HeaderBar /> }
            <Box sx={{ flexGrow: 1, paddingTop: '2rem' }}>
                <Outlet />
            </Box>
        </Box>
    );
}