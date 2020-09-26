import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Tooltip, Avatar
} from '@material-ui/core';
import clsx from 'clsx';
import {
  MdMenu,
} from "react-icons/all";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "../component/LogoutButton";
import LoginButton from "../component/LoginButton";

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
}));

type Props = {
  handleDrawerOpen: () => void
  open: boolean
};

const Bar: React.FC<Props> = ({children, handleDrawerOpen, open}) => {

  const classes = useStyles();

  const { user, isAuthenticated } = useAuth0();
  console.log(user);

  return (
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
        <Typography variant="h6" noWrap style={{flexGrow: 1}}>
          Mini variant drawer
        </Typography>

        {isAuthenticated?
          <>
            <Tooltip title={user.given_name || user.name}>
              <Avatar alt={user.name} src={user.picture} />
            </Tooltip>
            <LogoutButton />
          </>
        : <LoginButton />}

      </Toolbar>
    </AppBar>
  )
};

export default Bar;
