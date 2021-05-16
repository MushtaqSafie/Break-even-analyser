import React, { useRef } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { useStoreContext } from "../../../utils/GlobalState";
import { ADD_FIXEDCOST } from "../../../utils/actions";
import API from "../../../utils/API"


import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

function FixedCostsDialog(props) {
  const { handleClose, open } = props;
  const itemRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const amountRef = useRef();

  const [state, dispatch] = useStoreContext();

  const handleSubmit = () => {
    const newfixedCost = {
      fixed_cost_item: itemRef.current.value,
      date: new Date(dateRef.current.value),
      description: descriptionRef.current.value,
      Amount: amountRef.current.value
    }
    // console.log(newfixedCost);
    API.newFixedCost(newfixedCost)
      .then(res => {
        let i = res.data
        let data = {
          name: i.fixed_cost_item,
          date: i.date,
          description: i.description,
          amount: i.Amount,
          id: i.id
        }
        dispatch({ 
          type: ADD_FIXEDCOST,
          fixedcost: data
        })
      })
      .catch(err => console.log(err));
    handleClose();
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ADD NEW</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new product, please enter the following information.
          </DialogContentText>

          <TextField
            margin="dense"
            label="Date"
            fullWidth
            variant={"outlined"}
            autoFocus
            type="date"
            inputRef={dateRef}
          />
          <TextField
            margin="dense"
            label="Fixed Cost Item"
            fullWidth
            inputRef={itemRef}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            inputRef={descriptionRef}
          />

          <FormControl fullWidth >
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              type="number"
              inputRef={amountRef}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FixedCostsDialog;