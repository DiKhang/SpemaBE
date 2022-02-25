/** @format */

import express from "express";
import { Response, Request, NextFunction } from "express";
import { handleUploadFile } from "../../controller/intex";
import {
	addFood,
	addGroupFood,
	removeFood,
	removeGroupFood,
	updateFood,
	updateGroupFood,
} from "../../controller/v1/system";
import { auth, upload } from "../../utils/middleware";

const router = express.Router();

router.route("/food").put(auth, addFood).post(auth, updateFood).delete(auth, removeFood);
router
	.route("/groupfood")
	.put(auth, addGroupFood)
	.post(auth, updateGroupFood)
	.delete(auth, removeGroupFood);

export default router;
