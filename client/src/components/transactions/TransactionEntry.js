
export default function TransactionEntry({ transaction }) {
    return (
        <div>
            {transaction.amount['$numberDecimal']} <br />
            {transaction.type} <br />
            {transaction.date}
        </div>
    );
}