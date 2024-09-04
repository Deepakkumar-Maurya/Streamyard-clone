import express from "express";
import http from "http";
import path from "path";

import { Server as SocketIO } from "socket.io";

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.static(path.resolve("./public")));

const io = new SocketIO(server);

io.on("connection", (socket) => {
    console.log("socket connected", socket.id);
    socket.on("binarystream", (data) => {
        console.log("binary stream", data);
    })
})


server.listen(PORT, () => {
    console.log("listening on *:3000");
})