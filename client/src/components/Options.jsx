import React, { useState, useContext } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({}));

const Options = ({ children }) => {
  const [idToCall, setIdToCall] = useState("");
  const { me, name, setName, callAccepted, callEnded, leaveCall, callUser } =
    useContext(SocketContext);

  return (
    <div>
      <Container>
        <Paper elevation={10}>
          <form noValidate autoComplete="off">
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography gutterBottom variant="h6">
                  Account Info
                </Typography>
                <TextField
                  label="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <CopyToClipboard text={me}>
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<Assignment />}
                  >
                    Copy Your ID
                  </Button>
                </CopyToClipboard>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography gutterBottom variant="h6">
                  Make a Call
                </Typography>
                <TextField
                  label="ID to call"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                />
                {callAccepted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PhoneDisabled />}
                    onClick={leaveCall}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Phone />}
                    onClick={() => callUser(idToCall)}
                  >
                    Call User
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
            {children}
        </Paper>
      </Container>
    </div>
  );
};

export default Options;
