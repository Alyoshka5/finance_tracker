import { useState, useEffect, useRef } from 'react';
import { TextField, Box, Grid, Button, Typography, useTheme } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useTransactions from '../../hooks/useTransactions';
import useModal from '../../hooks/useModal';
import useSortTransactions from '../../hooks/useSortTransactions';
import useOpenModal from '../../hooks/useOpenModal';
import TransactionDetailModal from './TransactionDetailModal';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const emptyTransaction = {
    amount: '',
    date: '',
    type: '',
    category: '',
    description: '',
    details: ''
}

export default function TransactionForm({ targetTransaction }) {
    const axiosPrivate = useAxiosPrivate();
    const { setTransactions } = useTransactions();
    const {modalOpen, setModalOpen} = useModal();
    const sortTransactions = useSortTransactions();
    const openModal = useOpenModal();
    const theme = useTheme();

    const [transaction, setTransaction] = useState(targetTransaction || emptyTransaction);
    const prevDate = useRef(transaction.date);
    

    useEffect(() => {
        if (!modalOpen && targetTransaction)
            setTransaction(emptyTransaction);
    }, [modalOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!transaction.date)
            transaction.date = new Date();
        else if (transaction.date.toString() === 'Invalid Date')
            transaction.date = prevDate.current || new Date();

        try {
            let response;
            if (targetTransaction) {
                response = await axiosPrivate.put('/transactions', transaction);
                setTransactions(prev => {
                    prev = prev.filter(cur => cur._id !== response.data._id);
                    return sortTransactions([...prev, response.data]);
                });
            } else {
                response = await axiosPrivate.post('/transactions', transaction);
                setTransactions(prev => sortTransactions([...prev, response.data]));
            }
    

            setTransaction({
                amount: '',
                date: '',
                type: '',
                category: '',
                description: '',
                details: ''
            });
            openModal(<TransactionDetailModal transaction={response.data} />);
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    return (
        <Box component='form' noValidate
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
                backgroundColor: theme.palette.primary.main,
                padding: '5rem 3rem',
                borderRadius: '1rem',
                border: `1px solid ${theme.palette.primary.light}a0`
            }}
        >
            <Typography component='h1' variant='h4'>
                {targetTransaction ? 'Edit' : 'New'} Transaction
            </Typography>

            <Grid container
                spacing={2}
                sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'center'
            }}>
                <Grid item xs={5}>
                    <TextField
                        required
                        fullWidth
                        label='Amount'
                        type='number'
                        value={transaction.amount}
                        onChange={(e) => setTransaction(prev => {
                            return {...prev, amount: e.target.value}
                        })}
                    />
                </Grid>

                <Grid item xs={5}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            required
                            sx={{width: '100%'}}
                            label='Date'
                            type='date'
                            defaultValue={new Date()}
                            value={transaction.date ? new Date(transaction.date) : new Date()}
                            onChange={(date) => setTransaction(prev => {
                                return {...prev, date}
                            })}
                        />
                    </LocalizationProvider>
                        
                </Grid>
                
                <Grid item xs={5}>
                    <TextField
                        required
                        fullWidth
                        label='Type'
                        type='text'
                        value={transaction.type}
                        onChange={(e) => setTransaction(prev => {
                            return {...prev, type: e.target.value}
                        })}
                    />
                </Grid>
                
                <Grid item xs={5}>
                    <TextField
                        fullWidth
                        label='Category'
                        type='text'
                        value={transaction.category}
                        onChange={(e) => setTransaction(prev => {
                            return {...prev, category: e.target.value}
                        })}
                    />
                </Grid>
                
                <Grid item xs={10}>
                    <TextField
                        fullWidth
                        label='Description'
                        type='text'
                        value={transaction.description}
                        onChange={(e) => setTransaction(prev => {
                            return {...prev, description: e.target.value}
                        })}
                    />
                </Grid>
                
                <Grid item xs={10}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        label='Details'
                        type='number'
                        value={transaction.details}
                        onChange={(e) => setTransaction(prev => {
                            return {...prev, details: e.target.value}
                        })}
                    />
                </Grid>
                
                <Grid item xs={10}
                    display='flex'
                    justifyContent='center'   
                >
                    <Button
                        type='submit'
                        variant='contained'
                        sx={{
                            padding: '0.4rem 2rem',
                        }}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>

            <Box>
                {targetTransaction ?
                    <Button onClick={() => openModal(<TransactionDetailModal transaction={targetTransaction} />)}>Cancel</Button>
                :
                    <Button onClick={() => setModalOpen(false)}>Close</Button>    
                }
            </Box>
        </Box>
    );
}