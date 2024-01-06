import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import useTransactions from '../../hooks/useTransactions';
import useSortTransactions from '../../hooks/useSortTransactions';
import TransactionTableContainer from './TransactionTableContainer';
import { Button, Grid } from '@mui/material';
import OverviewPanel from '../overview_panel/OverviewPanel';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import SiteHeader from '../SiteHeader';

export default function TransactionPage() {
    useDocumentTitle('Transactions');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
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

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <Grid container sx={{padding: '1rem'}}>
            <Grid item> 
                <SiteHeader />
            </Grid>
            <Grid item xs={12}> 
                <Button onClick={handleLogout}>Logout</Button>
            </Grid>
            <Grid item xs={9.5}>
                <TransactionTableContainer />
            </Grid>
            <Grid item xs={2.5}>
                <OverviewPanel />
            </Grid>
        </Grid>
    );
}
