import { createTheme } from '@mui/material/styles';

const MyTheme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
            dark: '#007b00'
        },
        secondary: {
            main: '#ffc107',
        },
    },
    typography: {
        fontFamily: 'Roboto',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                color: 'primary',
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#f0f0f0',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    color: 'black',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                },
                indicator: {
                    backgroundColor: 'primary.main'
                },
                tab: {
                    textTransform: 'none', // Disables text transformation (uppercase, lowercase, etc.)
                    '.&Mui-selected' :{
                        backgroundColor: 'primary.dark',
                      },
                      
                    fontFamily: 'Roboto', // Sets the font family to Roboto
                }

            }
        },
        MuiToolbar: {
            defaultProps: {
                color: 'primary'
            },
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }
            }
        }
    }
}
);

export default MyTheme;
