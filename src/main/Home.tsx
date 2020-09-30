import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

const Home: React.FC<{}> = () => {

  const classes = useStyles();

  return <div className={classes.container}>
    <h2>Home</h2>
  </div>;
};
export default Home;
