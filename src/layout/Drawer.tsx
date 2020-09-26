import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Divider,
  Drawer as DrawerMui,
  IconButton,
  List,
} from '@material-ui/core';
import clsx from 'clsx';
import {
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/all";
import DrawerLink from "../component/DrawerLink";
import {Section} from "../Routes";
import Bar from './Bar';

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

type Props = {
  sections: Section[]
  toolbarClass: string
};

const Drawer: React.FC<Props> = ({children, sections, toolbarClass}) => {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (<>
    <Bar handleDrawerOpen={handleDrawerOpen} open={open} />

    <DrawerMui
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={toolbarClass}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <MdChevronRight /> : <MdChevronLeft />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {sections.map((section, _index) => (
          <div key={section.text}>
            <DrawerLink {...section} />
          </div>
        ))}
      </List>
    </DrawerMui>

  </>)
};

export default Drawer;
