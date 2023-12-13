import { useState, useEffect } from 'react';
import TransactionEntry from './TransactionEntry';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

export default function TransactionPage() {
    const { auth } = useAuth();

    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {
        const response = await axios.get('/transactions', {
            headers: {
                'authorization': `Bearer ${auth.accessToken}`
            }
        });

        setTransactions(response.data);
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
