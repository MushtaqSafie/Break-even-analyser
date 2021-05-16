import React from 'react';
import { CssBaseline, Box, Container, Grid, makeStyles } from '@material-ui/core';

import GithubLink from "../components/GithubLink"
import NavBar from "../components/NavBar"

import TableBody from '../components/TableBody';
import TypographyTitle from "../components/TypographyTitle";

import { headCells, rows } from "../tables/ProductInfo"

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

}));

const ProductInformation = () => {
  const classes = useStyles();
  


  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar/>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TypographyTitle 
                title={"Fixed Costs"} 
              />
              <TableBody headCells={headCells} rows={rows} />
            </Grid>
          </Grid>
          <Box pt={4}>
            <GithubLink />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default ProductInformation;
