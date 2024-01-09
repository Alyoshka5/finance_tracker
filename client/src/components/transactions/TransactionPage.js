import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useTransactions from '../../hooks/useTransactions';
import useSortTransactions from '../../hooks/useSortTransactions';
import TransactionTableContainer from './TransactionTableContainer';
import { Grid } from '@mui/material';
import OverviewPanel from '../overview_panel/OverviewPanel';
import useDocumentTitle from '../../hooks/useDocumentTitle';

export default function TransactionPage() {
    useDocumentTitle('Transactions');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setTransactions } = useTransactions();
    const sortTransactions = useSortTransactions();

    const getTransactions = async () => {
        try {
            const response = await axiosPrivate.get('/transactions');
            setTransactions(sortTransactions(response.data));
        } catch(err) {
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <Grid container>
            <Grid item xs={9.5}>
                <TransactionTableContainer />
            </Grid>
            <Grid item xs={2.5}>
                <OverviewPanel />
            </Grid>
        </Grid>
    );
}
