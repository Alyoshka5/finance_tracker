import { Box, Grid, Typography } from "@mui/material";

const containerStyles = {
    width: '50%',
    backgroundColor: '#fff',
    padding: '5rem 3rem',
    borderRadius: '1rem',
    boxShadow: '0 0 0.5rem #999'
}

export default function TransactionDetailModal({ transaction }) {

    return (
        <Box sx={containerStyles}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h4' sx={{alignSelf: 'start'}}>View Transaction</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Amount
                    </Typography>
                    $ {transaction.amount.toFixed(2)}
                </Grid>

                <Grid item xs={6}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Date
                    </Typography>
                    {transaction.date}
                </Grid>

                <Grid item xs={6}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Type
                    </Typography>
                    {transaction.type}
                </Grid>

                <Grid item xs={6}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Category
                    </Typography>
                    {transaction.category || '—'}
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Description
                    </Typography>
                    <Typography variant='body1'>
                        {transaction.description || 'No description'}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='overline' sx={{fontWeight: 'bold', fontSize: '1rem', mr: '1rem'}}>
                        Details
                    </Typography>
                    <Typography variant='body1'>
                        {transaction.details || 'No details'}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}