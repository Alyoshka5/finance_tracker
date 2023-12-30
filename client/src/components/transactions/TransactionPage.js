import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import TransactionForm from './TransactionForm';
import useTransactions from '../../hooks/useTransactions';
import TransactionTable from './TransactionTable';
import useOpenModal from '../../hooks/useOpenModal';
import useSortTransactions from '../../hooks/useSortTransactions';

export default function TransactionPage() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
    const { setTransactions } = useTransactions();
    const openModal = useOpenModal();
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
        <div>
            <button href='' onClick={handleLogout} style={{marginTop: '5px'}}>Logout</button>
            <h1>Transactions</h1>
            <TransactionTable />
            <button onClick={() => openModal(<TransactionForm />)}>Add Transaction</button>
            
        </div>
    );
}
