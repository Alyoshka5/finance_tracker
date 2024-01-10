import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useTransactions from '../../hooks/useTransactions';
import useSortTransactions from '../../hooks/useSortTransactions';
import TransactionTableContainer from './TransactionTableContainer';
import { Box } from '@mui/material';
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
        <Box
            display='flex'
            width='100%'
            boxSizing='border-box'
        >
            <Box
                width='78%'
            >
                <TransactionTableContainer />
            </Box>
            <Box
                width='22%'
            >
                <OverviewPanel />
            </Box>
        </Box>
    );
}
