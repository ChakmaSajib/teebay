import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
    return {
        logo: {
            flexGrow: 1,

        },
        navbar: {
            backgroundColor: '#203040',
            '&a': {
                color: '#ffffff',
                marginLeft: 10,
            },
            padding: theme.spacing(2),

        },

        page: {
            minHeight: '90vh',
            width: "100 %",
            marginTop: '5rem'
        },
        footer: {
            marginTop: 10,
            textAlign: 'center',
        },
        section: {
            marginTop: 10,
            marginBottom: 10,
        },
        form: {
            maxWidth: 800,
            margin: '0 auto',
        },

        paper: {
            width: 600,
            textAlign: 'center',
        },
        productHeading: {
            textAlign: 'center',
        },
        upperCase: {
            textTransform: "uppercase"
        },
        button: {
            color: "white",
            backgroundColor: "red"

        },
        grayColor: {
            color: '#808080'
        }
    }

});
export default useStyles;