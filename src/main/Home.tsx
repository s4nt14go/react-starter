import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

const Home: React.FC<{}> = () => {

  const classes = useStyles();

  const { user } = useAuth0();
  console.log(user);

  return <div className={classes.container}>
    <h2>Home</h2>
  </div>;
};
export default Home;
