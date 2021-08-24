import React, { useContext } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const VideoPlayer = () => {
    const classes = useStyles();
    const { name, stream, myVideo, userVideo, call, callAccepted, callEnded } = useContext(SocketContext);

    return (
      <Grid container justify="center" className={classes.gridContainer}>
        {stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {name || "Name"}
              </Typography>
              <video
                className={classes.video}
                playsInline
                muted
                autoPlay
                ref={myVideo}
              />
            </Grid>
          </Paper>
        )}

        {callAccepted && !callEnded && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {call.name || "Name"}
              </Typography>
              <video
                className={classes.video}
                playsInline
                autoPlay
                ref={userVideo}
              />
            </Grid>
          </Paper>
        )}
      </Grid>
    );
};

export default VideoPlayer;
