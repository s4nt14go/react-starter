import React from 'react';
import Demo from './main/Demo/App';
import Home from './main/Home';
import {
  Switch,
  Route,
  Link as _Link,
  useLocation,
} from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, Toolbar,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import {
  MdChevronLeft,
  MdChevronRight,
  MdMenu,
  FaStar as _FaStar,
  ImHome3 as _ImHome3,
  GrTextAlignLeft as _GrTextAlignLeft,
} from "react-icons/all";
import styled, {css} from 'styled-components'
import {IconType} from "react-icons";
import Paragraphs from "./main/Paragraphs";


// region ------------------------------------------------------------- Drawer layout
function setSize(e:IconType):IconType {
  return styled(e)`
  font-size: x-large; 
  `
}
const [FaStar, ImHome3, GrTextAlignLeft] = [_FaStar, _ImHome3, _GrTextAlignLeft].map(icon => setSize(icon));

const Link = styled(_Link)`
  color: inherit;
  text-decoration: none;
`;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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
// endregion

const App: React.FC<{}> = () => {

  // region ------------------------------------------------------------- Drawer layout
  const { pathname } = useLocation();
  console.log('pathname', pathname);
  const Main = styled.main`
  flex-grow: 1;
  
  ${pathname !== '/starred' && css`
    padding: 24px;
  `}
`;

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // endregion

  return (<div className={classes.root}><CssBaseline />
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

        <Drawer
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
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <MdChevronRight /> : <MdChevronLeft />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Home', 'Paragraphs', 'Starred'].map((text, _index) => (<>
              {
                text === 'Starred' ?
                  <Link to="/starred">
                    <ListItem button key={text}>

                      <ListItemIcon>
                        <FaStar />
                      </ListItemIcon>

                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                  : text === 'Paragraphs' ?
                  <Link to="/paragraphs">
                    <ListItem button key={text}>

                      <ListItemIcon>
                        <GrTextAlignLeft />
                      </ListItemIcon>

                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                  : <Link to="/home">
                    <ListItem button key={text}>
                      <ListItemIcon>
                        <ImHome3 />
                      </ListItemIcon>

                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
              }
              </>))}
          </List>
        </Drawer>

        <Main>
          <div className={classes.toolbar} />

          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/paragraphs">
              <Paragraphs />
            </Route>
            <Route path="/starred">
              <Demo />
            </Route>
          </Switch>
        </Main>
  </div>);
};

export default App;
