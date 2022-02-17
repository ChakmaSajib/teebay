import Layout from './components/Layout';
import AppRoutes from './routes/routes';
import {
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { theme } from './utils/theme';


function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <AppRoutes />
      </Layout>

    </ThemeProvider>
  );
}

export default App;
