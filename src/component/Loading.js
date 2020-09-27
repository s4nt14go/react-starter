import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  background: {
    zIndex: theme.zIndex.drawer + 2,
  },
}));

export default function Loading() {
  const classes = useStyles();

  return <Backdrop className={classes.background} open>
    <CircularProgress style={{color: '#fff'}} />
  </Backdrop>;
}
