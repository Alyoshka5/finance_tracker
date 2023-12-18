import { useState, useEffect } from 'react';
import TransactionEntry from './TransactionEntry';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function TransactionPage() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {
        try {
            const response = await axiosPrivate.get('/transactions');
            setTransactions(response.data);
        } catch(err) {
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <div>
            <h1>Transactions</h1>
            {transactions.map(transaction => (
                <TransactionEntry key={transaction.date} transaction={transaction} />
            ))}
        </div>
    );
}
