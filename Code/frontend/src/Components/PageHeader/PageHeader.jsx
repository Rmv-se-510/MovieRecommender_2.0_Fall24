import React from "react";
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import "./PageHeader.css";
import { Button } from "@mui/material";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function PageHeader(props) {
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    marginLeft: props.drawerWidth,
                    width: `calc(100% - ${props.drawerWidth}px)`,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            },
        ],
    }));
    const AppHeader = styled(Toolbar)(({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }))
    return <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AppHeader >
            <Typography variant="h5" noWrap component="div" className="app-logo" color="primary" sx={{ fontWeight: 'bold' }}>
                CINEFLIX
            </Typography>
            {props.loggedIn &&
                <Button color="secondary"
                    className="logout"
                    endIcon={<LogoutOutlinedIcon />}
                    onClick={() => { props.setLoggedIn(false) }}>Logout</Button>}
        </AppHeader>
    </AppBar >
}
