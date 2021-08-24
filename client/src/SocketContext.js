import React, { useState, useEffect, useRef, createContext } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const myVideo = useRef();
  const userVideo = useRef();
  const connRef = useRef();

  const [stream, setStream] = useState();
  const [me, setMe] = useState("");
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    console.log("useffect");

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));
    // console.log('id',me)

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    console.log("answerCall()");

    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
      console.log("answerCall() onsignal");
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
      console.log("answerCall() onStream");
    });

    peer.signal(call.signal);

    connRef.current = peer;
  };

  const callUser = (id) => {
    console.log("callUser()");
    console.log("calluser()", id);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
      console.log("calluser(),onSignal");
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
      console.log("callUser(),onStream");
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
      console.log("callAccepted(),callAccepted");
    });

    connRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        me,
        name,
        stream,
        call,
        myVideo,
        userVideo,
        callAccepted,
        callEnded,
        setName,
        callUser,
        answerCall,
        leaveCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ContextProvider };
