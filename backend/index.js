const express = require("express")
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require("socket.io");
require('dotenv')

app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
    }
});


io.on("connection", (socket)=>{

    socket.on("joinRoom", data=>{
        socket.join(data.roomId);
        socket.to(data.roomId).emit("userJoined", {username: data.username})

    })

    socket.on("sendInput", data =>{
        socket.to(data.roomId).emit("rcvInput", data.input);
    })

    socket.on("sendOutput", data =>{
        socket.to(data.roomId).emit("rcvOutput", data.output);
    })

    socket.on("sendCode", data =>{
        socket.to(data.roomId).emit("rcvCode", data.code);
    })

    socket.on("sendLanguage", data =>{
        socket.to(data.roomId).emit("rcvLanguage", data.language);
    })

    socket.on("send_message", data => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on('disconnectUser', data=>{
        socket.to(data.roomId).emit("userLeft", {username: data.username})
        socket.disconnect();
    })

})

app.get('/', (req,res)=>{
    res.send("LiveShiksha")
})
server.listen(process.env.PORT||3001, ()=>{
    console.log("Server up and running");
})
