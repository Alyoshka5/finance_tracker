import { Box } from '@mui/material';
import '../App.css';

export default function ModalContainer({ children, open, setOpen }) {

    return (
        <Box
        sx={{
                display: (open ? 'flex' : 'none'),
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                top: '0',
                left: '0',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff00',
                backdropFilter: 'blur(3px)',
                
            }}
            className={`modal ${open ? 'active' : ''}`}
            onClick={(e) => (e.target === e.currentTarget) && setOpen(false)}
        >
            {children}
        </Box>
    )
}