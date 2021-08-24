const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET','POST'],
    },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/',(req,res) => {
    res.send('server is running');
});


io.on('connection', (socket) => {
    socket.emit('me', socket.id);
    console.log('me'.me);

    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded');
    });

    socket.on("callUser", ({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit('callUser',{signal: signalData, from, name});
        console.log('got calluser,emitting callUser')
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit('callAccepted',data.signal);
        console.log('got answerCall,emitting callAccepted')
    });
});



server.listen(PORT,() => console.log(`Server running on port ${PORT}`));
