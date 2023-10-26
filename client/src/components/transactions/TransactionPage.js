import { useState, useEffect } from 'react';
import TransactionEntry from './TransactionEntry';

export default function TransactionPage() {

    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {
        const response = await fetch('/transactions');
        const transactionsData = await response.json();

        setTransactions(transactionsData);
        console.log(transactionsData);
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
