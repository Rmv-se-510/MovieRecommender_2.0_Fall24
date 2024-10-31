import './App.css';
import SideNav from './Components/Sidenav/Sidenav';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PageHeader from './Components/PageHeader/PageHeader';
import WorkspaceShell from './Components/WorkspaceShell/WorkspaceShell';
import AppRouter from './AppRouter';
import { useState } from 'react';
import { useEffect } from 'react';

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
  let cached = JSON.parse(localStorage.getItem("loggedIn"));
  const initialValue = cached === null ? false : cached;
  const [loggedIn, setLoggedIn] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn])

  useEffect(() => (() => localStorage.clear("loggedIn")), [])

  return (<ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div className="App">
      <PageHeader drawerWidth={drawerWidth} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <main style={{ paddingTop: '64px' }}></main>
      {loggedIn && <SideNav drawerWidth={drawerWidth} />}
      <WorkspaceShell isLoginPage={!loggedIn} children={<AppRouter setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
    </div>
  </ThemeProvider>
  );
}

export default App;
