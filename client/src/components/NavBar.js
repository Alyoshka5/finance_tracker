import { Box, Button } from "@mui/material";
import SiteHeader from './SiteHeader';
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
    const navigate = useNavigate();
    const logout = useLogout();
    const { auth } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <Box
            display='flex'
            justifyContent='space-between'
        >
            <SiteHeader />
            {
                auth.userId ? 
                    <Button sx={{fontSize: '0.9rem', marginRight: '1rem'}} onClick={handleLogout}>Logout</Button>
                    :
                    ''
            }
        </Box>
    )
}