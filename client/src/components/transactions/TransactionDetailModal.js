import { Box, Grid, Typography, Button } from "@mui/material";
import useOpenModal from '../../hooks/useOpenModal';
import TransactionForm from './TransactionForm';
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useTransactions from "../../hooks/useTransactions";
import useModal from "../../hooks/useModal";

const containerStyles = {
    width: '50%',
    backgroundColor: '#fff',
    padding: '5rem 3rem',
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem #999'
}

export default function TransactionDetailModal({ transaction }) {
    const openModal = useOpenModal();
    const [deleteClicked, setDeleteClicked] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { setTransactions } = useTransactions();
    const { modalOpen, setModalOpen } = useModal();

    useEffect(() => {
        if (!modalOpen)
            setDeleteClicked(false);
    }, [modalOpen]);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete(`/transactions/${transaction._id}`);
            
            setTransactions(prev => prev.filter(cur => cur._id !== response.data._id));
            setModalOpen(false);
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    return (
        <Box sx={containerStyles}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h4' sx={{alignSelf: 'start'}}>View Transaction</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Amount
                    </Typography>
                    $ {transaction.amount.toFixed(2)}
                </Grid>

                <Grid item xs={6}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Date
                    </Typography>
                    {transaction.date}
                </Grid>

                <Grid item xs={6}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Type
                    </Typography>
                    {transaction.type}
                </Grid>

                <Grid item xs={6}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Category
                    </Typography>
                    {transaction.category || '—'}
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Description
                    </Typography>
                    <Typography variant='body1'>
                        {transaction.description || 'No description'}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Details
                    </Typography>
                    <Typography variant='body1'>
                        {transaction.details || 'No details'}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    {
                        deleteClicked ?
                            <Box>
                                <Typography variant='body' fontWeight='medium'>Are you sure you want to delete this transaction?</Typography>
                                <Box>
                                    <Button onClick={handleDelete}>Confirm</Button>
                                    <Button onClick={() => setDeleteClicked(false)}>Cancel</Button>
                                </Box>
                            </Box>
                        :
                            <Box>
                                <Button onClick={() => openModal(<TransactionForm targetTransaction={transaction} />)}>Edit</Button>
                                <Button onClick={() => setDeleteClicked(true)}>Delete</Button>
                            </Box>
                            
                    }
                </Grid>
            </Grid>
        </Box>
    )
}