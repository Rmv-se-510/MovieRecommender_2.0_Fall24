import React, { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';

export default function SideNav(props) {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    // const openedMixin = (theme) => ({
    //     width: props.drawerWidth,
    //     transition: theme.transitions.create('width', {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    //     overflowX: 'hidden',
    // });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme }) => ({
            width: props.drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            variants: [
                // {
                //     props: ({ open }) => open,
                //     style: {
                //         ...openedMixin(theme),
                //         '& .MuiDrawer-paper': openedMixin(theme),
                //     },
                // },
                {
                    props: ({ open }) => !open,
                    style: {
                        ...closedMixin(theme),
                        '& .MuiDrawer-paper': closedMixin(theme),
                    },
                },
            ],
        }),
    );

    // const toggleDrawer = () => setOpen(!open)
    const items = ["Profile", "Movies", "Search"]
    const listItems = items.map((item) => {
        switch (item) {
            case "Profile": {
                return (<ListItem key={item} disablePadding sx={{ display: 'block' }}>
                    <a href="/account">
                        <ListItemButton>
                            <ListItemIcon> <AccountBoxIcon /></ListItemIcon>
                            <ListItemText primary={item}
                                sx={[open ? { opacity: 1, } : { opacity: 0, },]}
                            />
                        </ListItemButton>
                    </a>
                </ListItem>)
            }
            case "Movies": {
                return (<ListItem key={item} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton>
                        <ListItemIcon> <MovieIcon /></ListItemIcon>
                        <ListItemText primary={item}
                            sx={[open ? { opacity: 1, } : { opacity: 0, },]}
                        />
                    </ListItemButton>
                </ListItem>)

            } case "Search": {
                return (<ListItem key={item} disablePadding sx={{ display: 'block' }}>
                    <a href="/homepage">
                        <ListItemButton>
                            <ListItemIcon> <SearchIcon /></ListItemIcon>
                            <ListItemText primary={item}
                                sx={[open ? { opacity: 1, } : { opacity: 0, },]}
                            />
                        </ListItemButton></a>
                </ListItem>)

            }
        }
    })

    return (
        <React.Fragment>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={() => { }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <List>
                    {listItems}
                </List>
            </Drawer>
        </React.Fragment>
    )
}
