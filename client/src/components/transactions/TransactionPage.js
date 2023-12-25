import { useState, useEffect } from 'react';
import TransactionEntry from './TransactionEntry';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { DataGrid } from '@mui/x-data-grid';
import TransactionForm from './TransactionForm';
import useTransactions from '../../hooks/useTransactions';

export default function TransactionPage() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
    const { transactions, setTransactions } = useTransactions();

    const getTransactions = async () => {
        try {
            const response = await axiosPrivate.get('/transactions');
            setTransactions(response.data);
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


    const columns = [
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'date', headerName: 'Date', width: 250 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'description', headerName: 'Description', width: 350 },
    ];

    return (
        <div>
            <button href='' onClick={handleLogout}>Logout</button>
            <h1>Transactions</h1>
            <DataGrid rows={transactions} columns={columns} getRowId={(row) => row._id} />
            <TransactionForm />
        </div>
    );
}
