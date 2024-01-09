import { Box, Typography } from '@mui/material';

export default function GroupRow({ groupTitle, amount }) {
    return (
        <Box
            display='flex'
            justifyContent='space-between'
        >
            <Typography variant='body'>{groupTitle}</Typography>
            <Typography variant='body'>${amount}</Typography>
        </Box>
    )
}