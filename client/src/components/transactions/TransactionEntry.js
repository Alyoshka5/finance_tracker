
export default function TransactionEntry({ transaction }) {
    console.log(transaction);
    return (
        <div>
            {transaction.amount} <br />
            {transaction.type} <br />
            {transaction.date}
        </div>
    );
}