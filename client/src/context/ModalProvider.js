import { Box } from '@mui/material';
import { createContext, useState } from 'react';

const ModalContext = createContext({});

export function ModalProvider({ children }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [contentComponent, setContentComponent] = useState(<Box></Box>);

    return (
        <ModalContext.Provider value={{ modalOpen, setModalOpen, contentComponent, setContentComponent }}>
            {children}
        </ModalContext.Provider>
    );
}

export default ModalContext;