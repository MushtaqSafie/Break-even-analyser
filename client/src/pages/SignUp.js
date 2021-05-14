import React, { useRef, useState } from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';

import { Alert, AlertTitle } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';
import logo from "../logo.png";
import GithubLink from "../components/GithubLink"
import { Redirect } from 'react-router'

import API from "../utils/API";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#fafafa",
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  media: {
    height: 110,
  },
  GithubLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/target" />
    }
  }

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignUpBtn = (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const emailAddress = emailRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email_address: emailAddress,
      user_password: password
    };

    if (firstName && lastName && emailAddress && password) {
      API.registerUser(userData).then(res => {
        res.data.status||setError(res.data.message);
        setRedirect(true);
      })
    } 

  }

  return (
    <Container component="main" maxWidth="xs">
      {renderRedirect()}
      <CssBaseline />
      <div className={classes.root}>
        <img src={logo} className={classes.media} alt="logo" />
        <Typography variant="subtitle1">
          Please enter your information
        </Typography>
        <form className={classes.form} onSubmit={handleSignUpBtn}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={firstNameRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={lastNameRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          { error && (
          <Grid item xs={12}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </Grid>
          )}

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box className={classes.GithubLink} mt={5}>
        <GithubLink />
      </Box>
    </Container>
  );
};

export default SignUp;