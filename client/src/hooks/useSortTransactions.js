
export default function useSortTransactions() {
    return (transactions) => {
        return transactions.sort((prev, cur) => {
            const dateDifference = Date.parse(cur.date) - Date.parse(prev.date);
            return dateDifference === 0 ? Date.parse(cur.dateCreated) - Date.parse(prev.dateCreated) : dateDifference;
        });
    }
}