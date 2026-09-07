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
            height='100%'
            boxSizing='border-box'
        >
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Typography variant='h4' sx={{color: theme.palette.primary.contrastText}}>Transactions</Typography>
                <Button
                    variant='contained'
                    onClick={() => openModal(<TransactionForm />)}
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.main,
                        borderRadius: '0.5rem'
                    }}
                    startIcon={<AddIcon />}
                >
                    Add Transaction
                </Button>
            </Box>
            <TransactionTable />
        </Box>
    )
}