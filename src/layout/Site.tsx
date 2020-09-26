import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Section} from "../Routes";
import SiteDrawer from './SiteDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }
}));

type Props = {
  sections: Section[]
};

const Site: React.FC<Props> = ({children, sections}) => {

  const classes = useStyles();

  return (<div className={classes.root}><CssBaseline />

    <SiteDrawer sections={sections} toolbarClass={classes.toolbar}/>

    <main style={{flexGrow: 1}}>
      <div className={classes.toolbar} />
      {children}
    </main>
  </div>)
};

export default Site;
