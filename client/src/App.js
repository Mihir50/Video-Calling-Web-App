import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Notifications from './components/Notifications';
import Options from './components/Options';
import VideoPlayer from './components/VideoPlayer';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "20px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "500px",
    padding: "5px 0",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  [theme.breakpoints.down("xs")]: {
    width: "90%",
  },
}));

const App = () => {
    const classes = useStyles();
    return (
      <div className={classes.wrapper}>
        <AppBar position='static' className={classes.appBar}>
          <Typography variant='h3' align='center'>Video chat</Typography>
        </AppBar>
        <VideoPlayer />
        <Options>
            <Notifications />
        </Options>
      </div>
    );
};

export default App;
