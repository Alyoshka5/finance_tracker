import { useContext } from 'react';
import TransactionContext from '../context/TransactionProvider';

export default function useTransactions() {
    return useContext(TransactionContext);
}