import './App.css';
import SideNav from './Components/Sidenav/Sidenav';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PageHeader from './Components/PageHeader/PageHeader';
import WorkspaceShell from './Components/WorkspaceShell/WorkspaceShell';
import AppRouter from './AppRouter';
import { useState } from 'react';

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
  const [loggedIn, setLoggedIn] = useState(false);
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




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         axios.get('http://localhost:5001/home')
//             .then(response => {
//                 setData(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error!', error);
//             });
//     }, []);

//     return (
//         <div className="App">
//             <h1>React Frontend with Flask Backend</h1>
//             {data && <p>{data.message}</p>}
//         </div>
//     );
// }

// export default App;
