import { Box, Button } from '@mui/material';


export default function TypeSelectionButtons({ transactionType, setTransactionType }) {

    return (
        <Box sx={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem'
        }}>
            <Button
                sx={{
                    borderBottom: transactionType === 'Expense' ? `2px solid #b2d5eeaa` : '',
                    opacity: transactionType === 'Expense' ? `1` : '0.7',
                    borderRadius: '0',
                    padding: '0',
                }}
                onClick={() => setTransactionType('Expense')}
            >Expense</Button>
            <Button
                sx={{
                    borderBottom: transactionType === 'Income' ? `2px solid #b2d5eeaa` : '',
                    opacity: transactionType === 'Income' ? `1` : '0.7',
                    borderRadius: '0',
                    padding: '0',
                }}
                onClick={() => setTransactionType('Income')}
            >Income</Button>
        </Box>
    )
}