/** @format */

import express from "express";
import { Response, Request, NextFunction } from "express";
import { handleUploadFile } from "../../controller/intex";
import { auth, upload } from "../../utils/middleware";
import { active, forgotPass, login, register, sendCode } from "../../controller/v1/auth";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/active").post(active);
router.route("/sendcode").post(sendCode);
router.route("/forgotpass").post(forgotPass);

export default router;
