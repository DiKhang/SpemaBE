"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../utils/middleware");
const auth_1 = require("../../controller/v1/auth");
const router = express_1.default.Router();
router.route("/register").post(auth_1.register);
router.route("/login").get(middleware_1.auth, auth_1.getUser).post(auth_1.login);
router.route("/active").post(auth_1.active);
router.route("/sendcode").post(auth_1.sendCode);
router.route("/forgotpass").post(auth_1.forgotPass);
router.route("/updateprofile").post(middleware_1.auth, auth_1.updateUser);
router.route("/changepass").post(middleware_1.auth, auth_1.changePass);
router.route("/manager").post(middleware_1.auth, auth_1.manager);
router.route("/getfulluser").get(middleware_1.auth, auth_1.getFullUser);
exports.default = router;
