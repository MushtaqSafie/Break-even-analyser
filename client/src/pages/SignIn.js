import React, { useRef, useState } from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../logo.png";
import GithubLink from "../components/GithubLink"
import { Redirect } from 'react-router';
import { Alert, AlertTitle } from '@material-ui/lab';
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { USER_REGISTER } from "../utils/actions";

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

const SignIn = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [state, dispatch] = useStoreContext();
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const renderRedirect = () => {
    if (redirect && state.isAuthenticated) {
      return <Redirect to="/ProductInformation" />
    }
  }

  const handleSignInBtn = (e) => {
    e.preventDefault();
    const userData = {
      email_address: emailRef.current.value,
      user_password: passwordRef.current.value
    }
    API.loginUser(userData).then(res => {
      res.data.status||setError(res.data.message);
      if (res.data.status) {
        const user = {
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email_address: res.data.email_address,
          id: res.data.Token
        }
        dispatch({
          type: USER_REGISTER,
          user: user
        })
        setRedirect(true);
      }
    })
    .catch(err => console.log(err));
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
        <form className={classes.form} onSubmit={handleSignInBtn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          { error && (
          <Grid item xs={12}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </Grid>
          )}
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
 
      </div>
      <Box className={classes.GithubLink} mt={9}>
        <GithubLink />
      </Box>
    </Container>
  );
};

export default SignIn;