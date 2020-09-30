import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  background: {
    zIndex: theme.zIndex.drawer + 2,
    flexDirection: 'column',
    color: '#fff',
  },
}));

export default function Loading() {
  const classes = useStyles();

  return <Backdrop className={classes.background} open>
    <CircularProgress style={{color: 'inherit'}} /><br />
    <Typography variant="subtitle1">
      Waiting for authentication status
    </Typography>
  </Backdrop>;
}
