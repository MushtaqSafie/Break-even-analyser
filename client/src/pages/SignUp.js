import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CardMedia from '@material-ui/core/CardMedia';

import logo from "../logo.png";

const useStyles = makeStyles((theme) => ({



}));

const SignUp = () => {
  const classes = useStyles();


  return (

      <CardMedia
        className={classes.media}
        image={logo}
        title="Paella dish"
      />
    

  );
};

export default SignUp;