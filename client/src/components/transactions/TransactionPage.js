import { useState, useEffect } from 'react';

export default function TransactionPage() {

    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {
        const response = await fetch('/transactions');
        const transactionsData = await response.json();

        setTransactions(transactionsData);
    }

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <div>
            <h1>Transactions</h1>
        </div>
    );
}
