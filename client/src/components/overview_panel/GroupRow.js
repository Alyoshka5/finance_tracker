import { Box } from '@mui/material';

export default function GroupRow({ groupTitle, amount }) {
    return <Box>{groupTitle} — ${amount}</Box>
}