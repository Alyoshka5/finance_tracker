import { Box, Button, useTheme } from "@mui/material";
import SiteHeader from './SiteHeader';
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
    const navigate = useNavigate();
    const logout = useLogout();
    const { auth } = useAuth();
    const theme = useTheme();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <Box
            display='flex'
            justifyContent='space-between'
            padding='0.8rem 1.2rem'
            position={auth.userId ? '' : 'absolute'}
            borderBottom={auth.userId ? `1px solid ${theme.palette.primary.contrastDark}` : ''}
        >
            <SiteHeader />
            {
                auth.userId ? 
                    <Button
                        sx={{
                            fontSize: '0.9rem', padding: '0.25rem 0.5rem', marginRight: '1rem'
                        }} 
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    :
                    ''
            }
        </Box>
    )
}