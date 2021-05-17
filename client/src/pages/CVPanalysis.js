import React, { useEffect, useState } from 'react';
import { CssBaseline, Box, Container, Grid, makeStyles, ListItemIcon } from '@material-ui/core';

import GithubLink from "../components/GithubLink"
import NavBar from "../components/NavBar"

import TypographyTitle from "../components/TypographyTitle";

import { useStoreContext } from "../utils/GlobalState";
// import { GET_PRODUCTS } from "../utils/actions";
import API from "../utils/API"
import ProductCard from "../components/Card"
import SalesMixCard from "../components/SalesMixCard"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';

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
  },
}));


const ProductInformation = () => {
  const classes = useStyles();
  const [state, dispatch] = useStoreContext();
  const [products, setProducts] = useState([]);
  const [fixedCosts, setFixedCosts] = useState([]);

  useEffect(() => {
    API.getProducts()
     .then(res => {
      res.data.forEach(item => {
        let SUM = 0;
        item.MaterialsCosts.forEach(currentItem => {
          SUM += parseInt(currentItem.cost_price);
        });
        item.costsTotal = SUM;
        item.contributionMargin = item.unit_sales_price - SUM;
        item.salesMix =  ( 100 / res.data.length ).toFixed(2);
      });

      setProducts(res.data);
     })
     .catch(err => console.log(err));
    API.getFixedCost()
     .then(res => {
      //  console.log(res.data);
       setFixedCosts(res.data)
     })
     .catch(err => console.log(err))
  }, [])

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

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

              <Grid container>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="SALES MIX"
                  />
              </Grid>
              
              {checked && <>
              <Grid container>
                  <Grid item xs={4}>
                      <List component="nav">
                        <ListItem >
                          <ListItemText primary="-"/>
                        </ListItem>
                        <Divider />
                        <TextField disabled  variant="filled" label="Number of units sold in previous period" type="number" fullWidth />
                        <Divider />
                        <TextField disabled  variant="filled" label="Sales Mix %" type="number" fullWidth />
                      </List>
     
                  </Grid>
                {products.map((item, index) => (
                  <Grid key={index} item xs={2}>
                    <SalesMixCard items={item}/>
                  </Grid>
                ))}
              </Grid>
              </>}

              <br/><br/>

              <Grid container spacing={3}>
                  {products.map((item, index) => (
                    <Grid key={index} item xs={4}>
                      <ProductCard items={item}/>
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
