"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const common_1 = require("./common");
const router_1 = __importDefault(require("./router"));
const swaggerDocument = require("./swagger/docs.json");
const app = (0, express_1.default)();
//config cors
var whiteList = [];
var corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("400:Not allowed by CORS"));
        }
    },
}; // add cors in whiteList
//config env
require("dotenv").config();
// Initialize Swagger Express Middleware with our Swagger file
let swaggerFile = path_1.default.join(process.cwd(), "swagger", "docs.yaml");
app.use("/uploads", express_1.default.static("uploads"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*", //enable all cors
}));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use("/api", router_1.default);
app.get("/", (req, res) => res.send("Server create by BaronED Typescript + Express !"));
app.use((req, res, next) => {
    next(new Error(`404:Not found endpoint !`));
});
app.use((err, req, res, next) => {
    var error = err.message;
    var code = error.slice(0, error.indexOf(":"));
    var message = error.slice(error.indexOf(":") + 1, error.length);
    (0, common_1.writeLog)(code, message, req);
    res.status(code).json(message);
});
exports.default = app;
