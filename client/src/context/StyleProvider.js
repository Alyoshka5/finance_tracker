import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#002536',
            light: '#B2D5EE',
            dark: '#0E2532',
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
            },
        },
      },
});

export default function StyleProvider({ children }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}