import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import WalletRoundedIcon from '@mui/icons-material/WalletRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SiteHeader from "./SiteHeader";
import { useNavigate, useLocation } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import NavBarButton from './NavBarButton';

export default function NavBar() {
    const navigate = useNavigate();
    const theme = useTheme();
    const logout = useLogout();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <Drawer
            sx={{
                width: '240px',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    color: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.contrastMain,
                    width: '240px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingBottom: '0.5rem'
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}
            >
                <List>
                    <ListItem 
                        key='header' 
                        disablePadding 
                    >
                        <ListItemButton>
                            <SiteHeader />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List>
                    <ListItem 
                        key='transactions' 
                        disablePadding
                        sx={{
                            padding: '0.25rem 0.5rem',
                        }}
                    >
                        <NavBarButton 
                            onClick={() => navigate('/transactions')}
                            active={location.pathname === '/transactions'}
                        >
                            <ListItemIcon>
                                <ImportExportRoundedIcon sx={{color: theme.palette.primary.light}} />
                            </ListItemIcon>
                            <ListItemText primary='Transactions' />
                        </NavBarButton>
                    </ListItem>
                    <ListItem key='accounts' disablePadding
                        sx={{
                            padding: '0.25rem 0.5rem',
                        }}
                    >
                        <NavBarButton 
                            onClick={() => navigate('/accounts')}
                            active={location.pathname === '/accounts'}
                        >
                            <ListItemIcon>
                                <WalletRoundedIcon sx={{color: theme.palette.primary.light}} />
                            </ListItemIcon>
                            <ListItemText primary='Accounts' />
                        </NavBarButton>
                    </ListItem>
                </List>
            </Box>
            <List>
                <ListItem 
                    key='logout' 
                    disablePadding
                    sx={{
                        padding: '0.25rem 0.5rem',
                    }}
                >
                    <NavBarButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutRoundedIcon sx={{color: theme.palette.primary.light}} />
                        </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </NavBarButton>
                </ListItem>
            </List>
        </Drawer>
    );
}