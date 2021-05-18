import React, { useEffect, useState } from 'react';
import { CssBaseline, Box, Container, Grid, makeStyles } from '@material-ui/core';
import GithubLink from "../components/GithubLink"
import NavBar from "../components/NavBar"
import TypographyTitle from "../components/TypographyTitle";
import API from "../utils/API"
import ProductCard from "../components/Card"
import SalesMixCard from "../components/SalesMixCard"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

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
  shape: {
    backgroundColor: "#7986cb",
    color: "#fff",
    borderRadius: 10,
    height: 40,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
}));

const Rectangle =(props) => {
  const classes = useStyles();
  return (
    <div className={classes.shape} >{props.text}</div>
  )
}

const ProductInformation = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [fixedCosts, setFixedCosts] = useState(0);
  const [weightedMargin, setWeightedMargin] = useState(0);
  const [weightedBreakeven, setWeightedBreakeven] = useState(0);
  const [totalMaterialCosts, setTotalMaterialCosts] = useState(0);
  const [totalCosts, setTotalCosts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [profit, setProfit] = useState(0);

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
        item.soldQty =  ( 100 / res.data.length * 10 ).toFixed(0);
        item.length = res.data.length;
      });
      setProducts(res.data);
      updateWeightedMargin();
     })
     .catch(err => console.log(err));
    API.getFixedCost()
     .then(res => {
      let totalAmount = 0;
      res.data.forEach(item => {
        totalAmount += parseInt(item.Amount);
      });
      setFixedCosts(totalAmount)
     })
     .catch(err => console.log(err))
     setTotalCosts( parseInt(fixedCosts) + parseInt(totalMaterialCosts));
     setProfit((totalRevenue - totalCosts).toFixed(0));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weightedMargin, weightedBreakeven, totalMaterialCosts])

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleQtyChanges = (id, value) => {
    let newObj = [];
    let soldQtySUM = 0;
    products.forEach(item => {
      if (item.id === id) {
        item.soldQty = value
      }
      newObj.push(item);
      soldQtySUM += parseInt(item.soldQty);
    });
    setProducts(newObj);
    let newItem = []
    products.forEach(item => {
      let newPercent = ((item.soldQty / soldQtySUM) * 100).toFixed(2)
      item.salesMix = newPercent;
      newItem.push(item);
    });
    setProducts(newItem)
    updateWeightedMargin();
  }

  const updateWeightedMargin = () => {
    let weightedMargin = 0;
    products.forEach(item => {
      let num = (item.salesMix/100) * item.contributionMargin;
      weightedMargin += num;
    });
    setWeightedMargin(weightedMargin);
    let weightedBreak = Math.ceil( fixedCosts / weightedMargin );
    setWeightedBreakeven(weightedBreak);
    updateBreakEven();
    
  }

  const updateBreakEven = () => {
    let newArr = [];
    let totalCost = 0;
    let totalRevenue = 0;
    products.forEach(item => {
      item.breakEvenUnit = Math.ceil(weightedBreakeven * ( item.salesMix/100 ));
      item.breakEvenDollor = (item.breakEvenUnit * item.unit_sales_price).toFixed(2);
      totalCost += item.breakEvenUnit * item.costsTotal;
      totalRevenue += item.breakEvenDollor;
      newArr.push(item)
    });
    setProducts(newArr)
    setTotalMaterialCosts(totalCost);
    setTotalRevenue((totalRevenue).toFixed(2));
  }

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
                    <SalesMixCard items={item} handleChange={handleQtyChanges}/>
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
              <br/><br/>
              <Typography variant="h5" gutterBottom>
                Break-even Point (in Total)
              </Typography>
                <Divider />
                <br/>
              <Typography variant="h6" gutterBottom>
                Fixed Costs: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Badge color="secondary"><Rectangle text={'$ ' + fixedCosts} /></Badge>
              </Typography>
              <Typography variant="h6" gutterBottom>
                Material Costs: &nbsp;
                <Badge color="secondary"><Rectangle text={"$" + totalMaterialCosts} /></Badge>
              </Typography>
                <Divider />
                <br/>
              <Typography variant="h6" gutterBottom>
                Total Costs: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Badge color="secondary"><Rectangle text={"$" + totalCosts} /></Badge>
              </Typography>
              <Typography variant="h6" gutterBottom>
                Total Revenue: &nbsp;
                <Badge color="secondary"><Rectangle text={"$" + totalRevenue} /></Badge>
              </Typography>
                <Divider />
                <br/>
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
