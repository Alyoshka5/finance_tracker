import { useState } from 'react';
import { TextField, Box, Grid, Button, Typography } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function TransactionForm() {
    const axiosPrivate = useAxiosPrivate();

    const [transaction, setTransaction] = useState({
        amount: '',
        date: '',
        type: '',
        category: '',
        description: '',
        details: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post('/transactions', transaction)
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
                width: '50%'
            }}
        >
            <Typography component='h1' variant='h4'>
                New Transaction
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
                        value={transaction.date}
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
                
                <Grid item>
                    <Button
                        type='submit'
                        variant='contained'
                    >
                        Add Transaction
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}