const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors')
const { Server } = require('socket.io');
const { Socket } = require('dgram');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["Get", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(` user connected ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id : ${socket.id + data} +joined room`)
    })

    socket.on("disconnect", () => {
        console.log("USer Disconnceted")
    })
})

server.listen(3001, () => {
    console.log("server is runnig")
})

