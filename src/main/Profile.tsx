import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  rounded: {
    borderRadius: '50%',
  },
}));

const Profile: React.FC<{}> = () => {

  const classes = useStyles();

  const { user } = useAuth0();
  console.log(user);
  const { nickname, picture, email } = user;

  return <div className={classes.container}>
    <h2>Profile</h2>

    <Grid container spacing={3}>
      <Grid item md={2}>
        <img
          src={picture}
          alt="Profile"
          className={classes.rounded}
        />
      </Grid>
      <Grid item>
        <Typography variant="h4">{nickname}</Typography>
        <Typography variant="subtitle1">{email}</Typography>
      </Grid>

      <Grid item md={12}>
        <SyntaxHighlighter language='json'>
          {JSON.stringify(user, null, 2)}
        </SyntaxHighlighter>
      </Grid>
    </Grid>
  </div>;
};
export default Profile;
