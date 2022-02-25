/** @format */

import express from "express";
import { Response, Request, NextFunction } from "express";
import { handleUploadFile } from "../../controller/intex";
import { auth, upload } from "../../utils/middleware";
import {
	active,
	changePass,
	forgotPass,
	getFullUser,
	getUser,
	login,
	manager,
	register,
	sendCode,
	updateUser,
} from "../../controller/v1/auth";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").get(auth, getUser).post(login);
router.route("/active").post(active);
router.route("/sendcode").post(sendCode);
router.route("/forgotpass").post(forgotPass);
router.route("/updateprofile").post(auth, updateUser);
router.route("/changepass").post(auth, changePass);
router.route("/manager").post(auth, manager);
router.route("/getfulluser").get(auth, getFullUser);

export default router;
