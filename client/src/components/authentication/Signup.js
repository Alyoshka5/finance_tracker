import { useState, useEffect } from 'react';
import { TextField, Box, Grid, Container, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Signup() {
    useDocumentTitle('Create Account');
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.path || '/';

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    useEffect(() => {
        setValidEmail(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        const result = pwdRegex.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: pwd
        }

        try {
            const response = await axios.post('/auth/signup', userData);
            const accessToken = response?.data?.accessToken;
            const userId = response.data.userId;

            setAuth({ accessToken, userId });
            navigate(from, { replace: true });
        } catch(err) {
            console.log(err.response.data.message);
        }

        setEmail('');
        setPwd('');
        setMatchPwd('');
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
                    justifyContent: 'center'
                }}
            >
                <Typography component='h1' variant='h4'>
                    Create Account
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            autoComplete='new-password'
                            value={pwd}
                            error={pwd !== '' && !validPwd && !pwdFocus}
                            helperText={(pwd && !validPwd && !pwdFocus) ? 'Must include an uppercase and lowercase letter, a number, and a special character' : ''}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            onChange={(e) => setPwd(e.target.value)}
                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name='confirm-password'
                            label='Confirm Password'
                            type='password'
                            value={matchPwd}
                            error={matchPwd !== '' && !validMatch && !matchFocus}
                            helperText={(matchPwd && !validMatch && !matchFocus) ? 'Passwords must match' : ''}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            onChange={(e) => setMatchPwd(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel control={
                            <Checkbox 
                            checked={persist}
                            onClick={() => setPersist(prevPersist => !prevPersist)}
                            />
                        }    
                            label='Remember me'
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            type='submit'
                            variant='contained'
                        >
                            Create Account
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{alignSelf: 'start'}}>
                    <Link to='/login'>Log In</Link>
                </Grid>
            </Box>
        </Container>
    )
}