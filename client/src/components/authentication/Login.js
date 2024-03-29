import { useState, useEffect, useContext } from 'react';
import { TextField, Box, Grid, Container, Button, Typography, Checkbox, FormControlLabel, useTheme } from '@mui/material';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;

export default function Login() {
    useDocumentTitle('Log In');
    const { setAuth, persist, setPersist } = useAuth();
    const theme = useTheme();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.path || '/';

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');

    useEffect(() => {
        setValidEmail(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: pwd
        }

        try {
            const response = await axios.post('/auth/login', userData);
            const accessToken = response?.data?.accessToken;
            const userId = response.data.userId;

            setAuth({ accessToken, userId });

            setEmail('');
            navigate(from, { replace: true });
        } catch(err) {
            console.log(err.response.data.message);
        }

        setPwd('');
    }

    return (
        <Container component='main' maxWidth='xs'
            sx={{
                height: '100%',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <Box component='form' noValidate
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component='h1' variant='h4'>
                    Login
                </Typography>

                <Grid container
                    spacing={2}
                    sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'center'
                }}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            autoFocus
                            name='email'
                            label='Email Address'
                            autoComplete='email'
                            value={email}
                            error={email !== '' && !validEmail && !emailFocus}
                            helperText={(email && !validEmail && !emailFocus) ? 'Invalid Email' : ''}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            autoComplete='current-password'
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel control={
                            <Checkbox 
                            checked={persist}
                            onClick={() => setPersist(prevPersist => !prevPersist)}
                            style={{
                                color: `${theme.palette.primary.light}c0`
                            }}
                            />
                        }    
                            label='Remember me'
                        />
                    </Grid>
                    <Grid item xs={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            type='submit'
                            variant='contained'
                            sx={{
                                width: '70%',
                                height: '2.5rem',
                                fontSize: '0.9rem'
                            }}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to='/signup'
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.primary.contrastText
                            }}
                        >Create Account</Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}