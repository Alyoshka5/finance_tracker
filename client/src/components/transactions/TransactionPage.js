import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import useTransactions from '../../hooks/useTransactions';
import useSortTransactions from '../../hooks/useSortTransactions';
import TransactionTableContainer from './TransactionTableContainer';

export default function TransactionPage() {
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
        <div>
            <button href='' onClick={handleLogout} style={{marginTop: '5px'}}>Logout</button>
            <TransactionTableContainer />
        </div>
    );
}
