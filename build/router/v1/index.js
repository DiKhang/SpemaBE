"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const intex_1 = require("../../controller/intex");
const middleware_1 = require("../../utils/middleware");
const auth_1 = __importDefault(require("./auth"));
const router = express_1.default.Router();
router.get("/", (req, res) => res.send("Wellcome to api v1 !"));
router.route("/uploadfile").post(middleware_1.auth, middleware_1.upload.single("filename"), intex_1.handleUploadFile);
router.use("/auth", auth_1.default);
exports.default = router;
