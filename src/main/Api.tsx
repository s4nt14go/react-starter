import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";
import SyntaxHighlighter from "react-syntax-highlighter";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Api: React.FC<{}> = () => {

  const classes = useStyles();

  const [message, setMessage] = useState();

  const { getAccessTokenSilently } = useAuth0();

  const callSecureApi = async () => {

    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return <div className={classes.container}>
    <h2>API</h2>

    <Button onClick={callSecureApi} color="secondary" variant="contained">
      Fetch Private API
    </Button>

    {message && <SyntaxHighlighter language='json'>
      {JSON.stringify(message, null, 2)}
    </SyntaxHighlighter>}

  </div>;
};
export default Api;
