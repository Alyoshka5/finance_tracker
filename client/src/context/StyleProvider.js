import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#002536',
            lighterMain: '#002B3F',
            light: '#B2D5EE',
            dark: '#0E2532',
            contrastDark: '#001C29',
            contrastText: '#B2D5EE'
        },
    },
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif'
        ].join(',')
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderColor: '#B2D5EE',
                    color: '#B2D5EE',
                    textTransform: 'none',
                },
                contained: {
                    backgroundColor: '#B2D5EE',
                    color: '#001C29',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: '#9dc9e9',
                    }
                }
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#B2D5EE80',
                        },
                        '&:hover fieldset': {
                            borderColor: '#B2D5EEc0',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#B2D5EEc0',
                        },
                        '& input': {
                            color: '#B2D5EE',
                        },
                      },
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: '#B2D5EEa0',
                    '&.Mui-focused': {
                        color: '#B2D5EE',
                    },
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#B2D5EEa0'
                }
            }
        }
    },
    
});

export default function StyleProvider({ children }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}