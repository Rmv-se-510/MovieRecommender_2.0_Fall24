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
  
  // Initialize loggedIn state from localStorage
  const [loggedIn, setLoggedIn] = useState(() => {
    const savedState = localStorage.getItem("loggedIn");
    return savedState === "true"; // Convert string to boolean
  });

  // Save loggedIn state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem("UID")
  //   }
  // }, [])

  return (<ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div className="App">
      <PageHeader drawerWidth={drawerWidth} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      {loggedIn && <SideNav drawerWidth={drawerWidth} />}
      <WorkspaceShell isLoginPage={!loggedIn} children={<AppRouter setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
    </div>
  </ThemeProvider>
  );
}

export default App;
