/** @format */

import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import path from "path";
import { writeLog } from "./common";
import router from "./router";

const swaggerDocument = require("./swagger/docs.json");

const app = express();

//config cors
var whiteList: string[] = [];

var corsOptions = {
	origin: function (origin: any, callback: any) {
		if (whiteList.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("400:Not allowed by CORS"));
		}
	},
}; // add cors in whiteList

//config env
require("dotenv").config();

// Initialize Swagger Express Middleware with our Swagger file
let swaggerFile = path.join(process.cwd(), "swagger", "docs.yaml");

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(
	cors({
		origin: "*", //enable all cors
	}),
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", router);
app.get("/", (req, res) => res.send("Server create by BaronED Typescript + Express !"));
app.use((req, res, next) => {
	next(new Error(`404:Not found endpoint !`));
});
app.use((err: any, req: any, res: any, next: any) => {
	var error = err.message;
	var code = error.slice(0, error.indexOf(":"));
	var message = error.slice(error.indexOf(":") + 1, error.length);
	writeLog(code, message, req);
	res.status(code).json(message);
});

export default app;
