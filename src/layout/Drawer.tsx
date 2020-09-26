import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Divider,
  Drawer as DrawerMui,
  IconButton,
  List,
  Toolbar,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import {
  MdChevronLeft,
  MdChevronRight,
  MdMenu,
} from "react-icons/all";
import styled from 'styled-components'
import DrawerLink from "../component/DrawerLink";
import {Section} from "../Routes";

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
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
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MdMenu />
        </IconButton>
        <Typography variant="h6" noWrap>
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>

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
