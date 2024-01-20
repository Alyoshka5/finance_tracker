import { Box, Button, Typography, useTheme } from "@mui/material";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";
import useOpenModal from "../../hooks/useOpenModal";
import AddIcon from '@mui/icons-material/Add';

export default function TransactionTableContainer() {
    const openModal = useOpenModal();
    const theme = useTheme();

    return (
        <Box
            display='flex'
            flexDirection='column'
            gap='0.5rem'
            padding='1rem 1.2rem'
            borderRight={`1px solid ${theme.palette.primary.contrastDark}`}
            height='100%'
            boxSizing='border-box'
        >
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Typography variant='h4'>Transactions</Typography>
                <Button
                    variant='outlined'
                    onClick={() => openModal(<TransactionForm />)}
                    sx={{'&:hover': {borderColor: theme.palette.primary.light, backgroundColor: theme.palette.primary.lighterMain}}}
                    startIcon={<AddIcon />}
                >
                    Add Transaction
                </Button>
            </Box>
            <TransactionTable />
        </Box>
    )
}