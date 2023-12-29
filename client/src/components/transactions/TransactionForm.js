import { useState, useEffect } from 'react';
import { TextField, Box, Grid, Button, Typography } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useTransactions from '../../hooks/useTransactions';
import useModal from '../../hooks/useModal';

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

    const [transaction, setTransaction] = useState(targetTransaction || emptyTransaction);
    

    useEffect(() => {
        if (!modalOpen && targetTransaction)
            setTransaction(emptyTransaction);
    }, [modalOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            if (targetTransaction) {
                const response = await axiosPrivate.put('/transactions', transaction);

                setTransactions(prev => {
                    prev = prev.filter(cur => cur._id !== response.data._id);
                    return [...prev, response.data];
                });
            } else {
                const response = await axiosPrivate.post('/transactions', transaction);
                setTransactions(prev => [...prev, response.data]);
            }
    

            setTransaction({
                amount: '',
                date: '',
                type: '',
                category: '',
                description: '',
                details: ''
            });
            setModalOpen(false);
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
                backgroundColor: '#fff',
                padding: '5rem 3rem',
                borderRadius: '1rem',
                boxShadow: '0 0 0.5rem #999'
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
                    <TextField
                        required
                        fullWidth
                        label='Date'
                        type='date'
                        value={transaction.date.split('T')[0]}
                        onChange={(e) => setTransaction(prev => {
                            return {...prev, date: e.target.value}
                        })}
                    />
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
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>

            <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Box>
    );
}