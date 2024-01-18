import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import useModal from '../hooks/useModal';

export default function ModalContainer() {
    const {modalOpen, setModalOpen, contentComponent} = useModal();

    return (
        <Box>
            <Box
            sx={{
                    display: (modalOpen ? 'flex' : 'none'),
                    width: '100vw',
                    height: '100vh',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '10',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ffffff00',
                    backdropFilter: 'blur(3px)',
                    
                }}
                onClick={(e) => (e.target === e.currentTarget) && setModalOpen(false)}
                >
                {contentComponent}
            </Box>
            <Outlet />
        </Box>
    )
}