/** @format */

import express from "express";
import { Response, Request, NextFunction } from "express";
import { handleUploadFile } from "../../controller/intex";
import {
	addFood,
	addGroupFood,
	addHall,
	addTable,
	removeFood,
	removeGroupFood,
	removeHall,
	removeTable,
	updateFood,
	updateGroupFood,
	updateHall,
	updateTable,
} from "../../controller/v1/system";
import { auth, upload } from "../../utils/middleware";

const router = express.Router();

router.route("/food").put(auth, addFood).post(auth, updateFood).delete(auth, removeFood);
router
	.route("/groupfood")
	.put(auth, addGroupFood)
	.post(auth, updateGroupFood)
	.delete(auth, removeGroupFood);
router.route("/table").put(auth, addTable).delete(auth, removeTable).post(auth, updateTable);
router.route("/hall").put(auth, addHall).delete(auth, removeHall).post(auth, updateHall);

export default router;
