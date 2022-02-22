/** @format */

import app from "../app";
import http from "http";

const server = http.createServer(app);
const port = process.env.PORT;

server.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
