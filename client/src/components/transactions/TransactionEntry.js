
export default function TransactionEntry({ transaction }) {
    
    return (
        <div>
            {transaction.amount} <br />
            {transaction.type} <br />
            {transaction.date}
        </div>
    );
}