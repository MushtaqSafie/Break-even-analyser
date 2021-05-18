import React from 'react';
import { CssBaseline, Box, Container, makeStyles, Typography } from '@material-ui/core';
import GithubLink from "../components/GithubLink"
import NavBar from "../components/NavBar"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Home = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar/>
    
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Typography variant="h2">
            Welcome to Break-even Point Analysis 
          </Typography>
          <Box pt={4}>
            <GithubLink />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default Home;
