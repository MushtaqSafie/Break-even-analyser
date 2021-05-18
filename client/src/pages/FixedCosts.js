import React, { useState, useEffect } from 'react';
import { CssBaseline, Box, Container, Grid, makeStyles } from '@material-ui/core';
import GithubLink from "../components/GithubLink"
import NavBar from "../components/NavBar"
import TableBody from '../components/TableBody';
import TypographyTitle from "../components/TypographyTitle";
import FixedCostsDialog from "../components/DialogBox/FixedCosts"
import { useStoreContext } from "../utils/GlobalState";
import { GET_FIXEDCOST } from "../utils/actions";
import API from "../utils/API"

const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'Id' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Fixed Cost Item' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount $' },
];

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

  const [state, dispatch] = useStoreContext();
  const [open, setOpen] = useState(false);

  const addNewHandler = () => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true);
    }
  }

  useEffect(() => {
    API.getFixedCost()
      .then(res => {
        let data = []
        res.data.forEach(i => {
          let obj = {
            id: i.id,
            name: i.fixed_cost_item,
            date: i.date,
            description: i.description,
            amount: i.Amount,
          }
          data.push(obj);
        });
        dispatch({ 
          type: GET_FIXEDCOST,
          fixedCosts: data
        })
      })
      .catch(err => console.log(err));
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
                title={"Fixed Costs"} 
                subtitle={"Fixed costs of  current period"}
              />
              <TableBody headCells={headCells} rows={state.fixedCosts} addNewHandler={addNewHandler} />
            </Grid>
          </Grid>
          <Box pt={4}>
            <GithubLink />
          </Box>
          <FixedCostsDialog handleClose={addNewHandler} open={open} />
        </Container>
      </main>
    </div>
  );
};

export default ProductInformation;
