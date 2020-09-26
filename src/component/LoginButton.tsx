import React from 'react';
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { initialPath } from '../layout/Landing';

const LoginButton: React.FC<{}> = () => {

  const { loginWithRedirect } = useAuth0();

  return <Button variant="contained" color="secondary" aria-label="login"
                 onClick={() => loginWithRedirect({redirectUri: `${window.location.origin}/${initialPath}`})}>
    Login
  </Button>
};

export default LoginButton;
