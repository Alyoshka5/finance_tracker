import { Box, Button, Typography } from "@mui/material";
import useTransactions from "../../hooks/useTransactions";
import { useEffect, useState } from "react";
import OverviewChart from "./OverviewChart";
import TypeSelectionButtons from "./TypeSelectionButtons";
import GroupList from "./GroupList";

export default function OverviewPanel() {
    const { transactions } = useTransactions();
    const [groupedCategories, setGroupedCategories] = useState([{Expense: {}, Income: {}}, {Expense: {}, Income: {}}]);
    const [transactionType, setTransactionType] = useState('Expense');
    
    useEffect(() => {
        setGroupedCategories(groupCategories());
    }, [transactions]);

    const groupCategories = () => {
        const sortedGroups = transactions.reduce(([groups, totalAmounts], curr) => {
            const newGroups = groups[curr.type];
            const newTotalAmounts = totalAmounts[curr.type];

            if (!curr.category) {
                if (newGroups['Other']) {
                    newGroups['Other'].push(curr);
                    newTotalAmounts['Other'] += curr.amount;
                } else {
                    newGroups['Other'] = [curr];
                    newTotalAmounts['Other'] = curr.amount;
                }
            }
            else if (newGroups[curr.category]) {
                newGroups[curr.category].push(curr);
                newTotalAmounts[curr.category] += curr.amount;
            }
            else {
                newGroups[curr.category] = [curr];
                newTotalAmounts[curr.category] = curr.amount;
            }

            groups[curr.type] = newGroups;
            totalAmounts[curr.type] = newTotalAmounts;

            return [groups, totalAmounts];
        }, [{Expense: {}, Income: {}}, {Expense: {}, Income: {}}]);

        return sortedGroups;
    }

    const getSortedGroupList = () => {
        let list = Object.keys(groupedCategories[1][transactionType]).length === 0 ? groupCategories()[1][transactionType] : groupedCategories[1][transactionType];
        const sortedList = {};
        const sortedKeys = Object.keys(list).sort((prev, curr) => prev === 'Other' ? 1 : curr === 'Other' ? -1 :  prev === curr ? 0 : prev < curr ? -1 : 1)
        
        sortedKeys.forEach(key => sortedList[key] = list[key]);

        return sortedList;
    }

    const groupList = getSortedGroupList();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 1.2rem'
        }}>
            <Typography variant='h5' style={{zIndex: '1'}}>Overview</Typography>

            <OverviewChart groupList={groupList} />

            <TypeSelectionButtons 
                transactionType={transactionType}
                setTransactionType={setTransactionType} 
            />

            <GroupList groupList={groupList} />
        </Box>
    )
}