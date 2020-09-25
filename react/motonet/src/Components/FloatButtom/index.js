import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 1,
    },
    width:50, 
    height:50,
    background:"rgb(85,210,246)",
    borderRadius:100,
    // position:"fixed",
    // top:100,
    // right:"3%",
  },
}));

export default function FloatButtom(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton  aria-label="add an alarm" onClick={props.onClick}>
        <AddIcon  style={{color:"#fff"}}/>
      </IconButton>
    </div>
  );
}
