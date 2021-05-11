import React, { useState } from "react";
import clsx from 'clsx';
import { Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, Badge, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
// import PeopleIcon from '@material-ui/icons/People';
import PollIcon from '@material-ui/icons/Poll';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <>
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Dashboard
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={5} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>

    <Drawer
      variant="permanent"
      classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
        <List>
          <ListItem button component="a" href="/ProductInformation">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Product Information" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MoneyOffIcon />
            </ListItemIcon>
            <ListItemText primary="Fixed Costs" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MoneyOffIcon />
            </ListItemIcon>
            <ListItemText primary="Bills of Material & DL" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PollIcon />
            </ListItemIcon>
            <ListItemText primary="Profit Volume Forecast" />
          </ListItem>
        </List>
      <Divider />

    </Drawer>
    </>
  )
}

export default NavBar