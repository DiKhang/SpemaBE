"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const system_1 = require("../../controller/v1/system");
const middleware_1 = require("../../utils/middleware");
const router = express_1.default.Router();
router.route("/inserts").post(middleware_1.auth, system_1.insertMany);
router.route("/gets").post(middleware_1.auth, system_1.getMany);
router.route("/update").post(middleware_1.auth, system_1.updateOne);
exports.default = router;
