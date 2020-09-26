import React from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import { GoSignOut } from 'react-icons/go';
import { useAuth0 } from "@auth0/auth0-react";
import { initialPath } from '../layout/Landing';

const LogoutButton: React.FC<{}> = () => {

  const { logout } = useAuth0();

  return <Tooltip title='Logout'>
      <IconButton
        aria-label="logout"
        onClick={() => logout ({returnTo: `${window.location.origin}/${initialPath}`})}
        color="inherit"
      >
        <GoSignOut />
      </IconButton>
    </Tooltip>
};

export default LogoutButton;
