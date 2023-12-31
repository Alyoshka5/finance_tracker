import { Box } from "@mui/material";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";
import useOpenModal from "../../hooks/useOpenModal";

export default function TransactionTableContainer() {
    const openModal = useOpenModal();

    return (
        <Box>
            <h1>Transactions</h1>
            <TransactionTable />
            <button onClick={() => openModal(<TransactionForm />)}>Add Transaction</button>
        </Box>
    )
}