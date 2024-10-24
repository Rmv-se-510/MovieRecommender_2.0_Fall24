import './App.css';
import SideNav from './Components/Sidenav/Sidenav';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PageHeader from './Components/PageHeader/PageHeader';
import LoginPage from './Login/LoginPage';
import WorkspaceShell from './Components/WorkspaceShell/WorkspaceShell';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#e50914"
    },
    secondary: {
      main: "#ffffff"
    }
  },
});

const drawerWidth = 240;

function App() {
  return (<ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div className="App">
      <PageHeader drawerWidth={drawerWidth} />
      <SideNav drawerWidth={drawerWidth} />
      <WorkspaceShell children={<LoginPage />} />
    </div>
  </ThemeProvider>
  );
}

export default App;
