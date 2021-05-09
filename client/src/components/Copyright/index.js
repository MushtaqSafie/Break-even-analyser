import React from "react";
import { Avatar, Link, Typography, makeStyles } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",

  },
  avatar: {
    marginLeft: 5,
    marginRight: 5,
    '&:hover': {
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[500],
    }
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    '&:hover': {
      textDecoration: "none",
    }
  }
}));

// this compoenet is create for the purpose of copyright, but it can also be used for any other content that goes in same spot e.g 'create by'
const Copyright = () => {
  const classes = useStyles(); 
  return (
    <Typography className={classes.root} variant="body2" color="textSecondary" align="center">
      {'Created By'}
      <Link className={classes.link}  color="inherit" href="https://github.com/mushtaqsafie" target="_blank">
        <Avatar className={classes.avatar}><GitHubIcon/></Avatar>
        Mushtaq Safie 
      </Link>
    </Typography>
  );
}

export default Copyright;