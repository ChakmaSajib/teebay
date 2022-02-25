import { createTheme } from '@mui/material';

export const theme = createTheme({
    typography: {
        h1: {
            fontSize: '1.6rem',
            fontWeight: 400,
            margin: '1rem 0'
        },
        h2: {
            fontSize: '1.4rem',
            fontWeight: 400,
            margin: '1rem 0'
        },

    },
    palette: {
        secondary: {
            main: '#ffffff'
        },


    }
});