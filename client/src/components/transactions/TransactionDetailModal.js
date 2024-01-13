import { Box, Grid, Typography, Button, useTheme } from "@mui/material";
import useOpenModal from '../../hooks/useOpenModal';
import TransactionForm from './TransactionForm';
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useTransactions from "../../hooks/useTransactions";
import useModal from "../../hooks/useModal";
import useFormatDate from "../../hooks/useFormatDate";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TransactionDetailModal({ transaction }) {
    const openModal = useOpenModal();
    const [deleteClicked, setDeleteClicked] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { setTransactions } = useTransactions();
    const { modalOpen, setModalOpen } = useModal();
    const formatDate = useFormatDate();
    const theme = useTheme();

    const containerStyles = {
        width: '50%',
        backgroundColor: theme.palette.primary.main,
        padding: '5rem 3rem',
        borderRadius: '1rem',
        border: `1px solid ${theme.palette.primary.light}`
    }

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
                    {formatDate(transaction.date, true)}
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
                            <Box
                                display='flex'
                                gap='0.5rem'
                            >
                                <EditIcon
                                    onClick={() => openModal(<TransactionForm targetTransaction={transaction} />)}
                                    sx={{
                                        '&:hover': {cursor: 'pointer', backgroundColor: theme.palette.primary.lighterMain},
                                        padding: '0.5rem',
                                        borderRadius: '0.5rem'
                                    }}
                                />
                                <DeleteIcon
                                    onClick={() => setDeleteClicked(true)}
                                    sx={{
                                        '&:hover': {cursor: 'pointer', backgroundColor: theme.palette.primary.lighterMain},
                                        padding: '0.5rem',
                                        borderRadius: '0.5rem'
                                    }}
                                />
                            </Box>
                            
                    }
                </Grid>
            </Grid>
        </Box>
    )
}