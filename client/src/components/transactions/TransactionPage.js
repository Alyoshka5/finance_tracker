import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import TransactionForm from './TransactionForm';
import useTransactions from '../../hooks/useTransactions';
import TransactionTable from './TransactionTable';

export default function TransactionPage() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
    const { setTransactions } = useTransactions();

    const [open, setOpen] = useState(false);

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

    return (
        <div>
            <button href='' onClick={handleLogout}>Logout</button>
            <h1>Transactions</h1>
            <TransactionTable />
            <button onClick={() => setOpen(true)}>Add Transaction</button>
            <TransactionForm setOpen={setOpen} />
        </div>
    );
}
