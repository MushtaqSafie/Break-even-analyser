import React from "react";
import { Avatar, Link, makeStyles } from '@material-ui/core';
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

const GithubLink = () => {
  const classes = useStyles(); 
  return (
    <div className={classes.root} align="center">
      {'Created By'}
      <Link className={classes.link}  color="inherit" href="https://github.com/mushtaqsafie" target="_blank">
        <Avatar className={classes.avatar}><GitHubIcon/></Avatar>
        Mushtaq Safie 
      </Link>
    </div>
  );
}

export default GithubLink;