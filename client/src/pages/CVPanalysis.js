import React, { useEffect, useState } from 'react';
import { CssBaseline, Box, Container, Grid, makeStyles, ListItemIcon } from '@material-ui/core';

import GithubLink from "../components/GithubLink"
import NavBar from "../components/NavBar"

import TypographyTitle from "../components/TypographyTitle";

import { useStoreContext } from "../utils/GlobalState";
// import { GET_PRODUCTS } from "../utils/actions";
import API from "../utils/API"
import Card from "../components/Card"

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
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

const ProductInformation = () => {
  const classes = useStyles();
  const [state, dispatch] = useStoreContext();
  const [products, setProducts] = useState([]);
  const [fixedCosts, setFixedCosts] = useState([]);

  useEffect(() => {
    API.getProducts()
     .then(res => {
      setProducts(res.data);
      // console.log(res.data);
     })
     .catch(err => console.log(err));
    API.getFixedCost()
     .then(res => {
      //  console.log(res.data);
       setFixedCosts(res.data)
     })
     .catch(err => console.log(err))
  }, [])


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
                title={"CVP Analysis"} 
              />

              <Grid container spacing={3}>
                {products.map((item, index) => (
                  <Grid key={index} item xs={4}>
                    <Card items={item}/>
                  </Grid>
                ))}
              </Grid>


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
