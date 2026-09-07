import { createTheme, ThemeProvider } from '@mui/material/styles';

const primaryColors = {
    main: '#001823',
    lighterMain: '#002B3F',
    light: '#B2D5EE',
    contrastMain: '#001e2c',
    contrastText: '#FFFFFF'
}

const theme = createTheme({
    palette: {
        primary: primaryColors,
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
                    borderColor: primaryColors.light,
                    color: primaryColors.contrastText,
                    textTransform: 'none',
                },
                contained: {
                    backgroundColor: primaryColors.light,
                    color: primaryColors.contrastMain,
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
                            borderColor: `${primaryColors.light}80`,
                        },
                        '&:hover fieldset': {
                            borderColor: `${primaryColors.light}c0`,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: `${primaryColors.light}c0`,
                        },
                        '& input': {
                            color: primaryColors.contrastText,
                        },
                        '& textarea': {
                            color: primaryColors.contrastText,
                        },
                      },
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: `${primaryColors.contrastText}a0`,
                    '&.Mui-focused': {
                        color: primaryColors.contrastText,
                    },
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: `${primaryColors.light}a0`
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    color: primaryColors.contrastText,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: `${primaryColors.light}80`,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: `${primaryColors.light}c0`,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: `${primaryColors.light}c0`,
                    },
                },
                icon: {
                    fill: `${primaryColors.light}a0`,
                },
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: primaryColors.contrastMain
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