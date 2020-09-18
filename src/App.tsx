import React from 'react';
import Demo from './main/Demo/App';
import Home from './main/Home';
import {
  Switch,
  Route,
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
  Toolbar,
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
  FaTable as _FaTable,
  IoMdRocket as _IoMdRocket,
  IoMdNutrition as _IoMdNutrition,
  MdLooksOne as _MdLooksOne,
} from "react-icons/all";
import styled, {css} from 'styled-components'
import Paragraphs from "./main/Paragraphs";
import DrawerLink from "./component/DrawerLink";
import LogRocket from './main/table/LogRocket';
import Nutrition from './main/table/Nutrition';
import QuickStart from './main/table/QuickStart';
import Example1 from './main/table/Example1';
import { setIconXL } from "./service/util";

// region ------------------------------------------------------------- Drawer layout
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
  //console.log('pathname', pathname);
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

  const [FaStar, ImHome3, GrTextAlignLeft, FaTable, IoMdRocket, IoMdNutrition, MdLooksOne] =
    [_FaStar, _ImHome3, _GrTextAlignLeft, _FaTable, _IoMdRocket, _IoMdNutrition, _MdLooksOne].map(icon => setIconXL(icon));

  // region ------------------------------------------------------------- LogRocket data
  const data = [
    { firstName: "jane", lastName: "doe", age: 20 },
    { firstName: "john", lastName: "smith", age: 21 }
  ];

  const columns = [
    {
      Header: "Name",
      columns: [
        {
          Header: "First Name",
          accessor: "firstName"
        },
        {
          Header: "Last Name",
          accessor: "lastName"
        }
      ]
    },
    {
      Header: "Other Info",
      columns: [
        {
          Header: "Age",
          accessor: "age"
        }
      ]
    }
  ];
  // endregion

  sections = [
    {
      to: '/home',
      text: 'Home',
      icon: <ImHome3 />,
      main: <Home />
    },
    {
      to: '/paragraphs',
      text: 'Paragraphs',
      icon: <GrTextAlignLeft />,
      main: <Paragraphs />
    },
    {
      to: '/starred',
      text: 'Starred',
      icon: <FaStar />,
      main: <Demo />
    },
    {
      to: '/table/log-rocket',
      text: 'LogRocket',
      icon: <IoMdRocket />,
      main: <LogRocket columns={columns} data={data} />
    },
    {
      to: '/table/nutrition',
      text: 'Nutrition',
      icon: <IoMdNutrition />,
      main: <Nutrition />
    },
    {
      to: '/table/quick',
      text: 'Quick Start',
      icon: <FaTable />,
      main: <QuickStart />
    },
    {
      to: '/table/example1',
      text: 'Example 1',
      icon: <MdLooksOne />,
      main: <Example1 />
    },
  ];
  defaultSection = sections[0];

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
            {sections.map((section, _index) => (<div key={section.text}>
                <DrawerLink {...section} />
            </div>))}
          </List>
        </Drawer>

        <Main>
          <div className={classes.toolbar} />
          <Switch>

            {sections.map((section, _index) => (
              <Route path={section.to} key={section.text}>
                {section.main}
              </Route>))}

            <Route path='/' key={defaultSection.text}>
              {defaultSection.main}
            </Route>

          </Switch>
        </Main>
  </div>);
};

export let sections : Array<any>;
export let defaultSection : any;
export default App;
