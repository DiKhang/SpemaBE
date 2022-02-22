/** @format */

import express from "express";
import { Response, Request, NextFunction } from "express";
import { handleUploadFile } from "../../controller/intex";
import { auth, upload } from "../../utils/middleware";
import { register } from "../../controller/v1/auth";

const router = express.Router();

router.route("/register").post(register);

export default router;
