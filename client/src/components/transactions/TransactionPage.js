import { useState, useEffect } from 'react';
import TransactionEntry from './TransactionEntry';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function TransactionPage() {
    const axiosPrivate = useAxiosPrivate();

    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {
        try {
            const response = await axiosPrivate.get('/transactions');
            setTransactions(response.data);
        } catch(err) {
            
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
