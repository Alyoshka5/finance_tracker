import { styled } from '@mui/material/styles';
import { ListItemButton } from '@mui/material';

const NavBarButton = styled(ListItemButton)(({ active, theme }) => ({
    borderRadius: '0.5rem',
    '&:hover': {
        backgroundColor: theme.palette.primary.main
    },
    ...(active && {
         backgroundColor: theme.palette.primary.lighterMain
    })
}));

export default NavBarButton;