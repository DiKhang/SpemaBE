"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors({
    origin: "*", //enable all cors
}));
const port = process.env.PORTSOCKET || 3001;
const server = http.createServer(app);
const io = require("socket.io")(server);
exports.io = io;
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
io.on("connection", (socket) => {
    console.log("Connect: " + socket.id);
    socket.on("disconnect", () => {
        console.log("Disconnect: " + socket.id);
    });
});
