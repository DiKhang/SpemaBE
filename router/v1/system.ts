/** @format */

import express from "express";
import { Response, Request, NextFunction } from "express";
import { handleUploadFile } from "../../controller/intex";
import {
	addFood,
	addGroupFood,
	addHall,
	addRequestOrder,
	addTable,
	getFullGroupFood,
	getFullHall,
	getFullRequestOrder,
	getFullRequestOrderByHallID,
	getFullRequestOrderByUserID,
	getFullTableOfHall,
	getMenu,
	getRequestOrder,
	removeFood,
	removeGroupFood,
	removeHall,
	removeTable,
	updateFood,
	updateGroupFood,
	updateHall,
	updateRequestOrder,
	updateStatusPaid,
	updateStatusRequestOrder,
	updateTable,
} from "../../controller/v1/system";
import { auth, upload } from "../../utils/middleware";

const router = express.Router();

router
	.route("/food")
	.get(getMenu)
	.put(auth, addFood)
	.post(auth, updateFood)
	.delete(auth, removeFood);
router
	.route("/groupfood")
	.get(getFullGroupFood)
	.put(auth, addGroupFood)
	.post(auth, updateGroupFood)
	.delete(auth, removeGroupFood);
router
	.route("/table")
	.get(getFullTableOfHall)
	.put(auth, addTable)
	.delete(auth, removeTable)
	.post(auth, updateTable);
router
	.route("/hall")
	.get(getFullHall)
	.put(auth, addHall)
	.delete(auth, removeHall)
	.post(auth, updateHall);
router
	.route("/requestorder")
	.get(getRequestOrder)
	.put(auth, addRequestOrder)
	.post(auth, updateRequestOrder);
router.route("/allrequestorder").get(getFullRequestOrder);
router.route("/requestorderbyuserid").get(auth, getFullRequestOrderByUserID);
router.route("/requestorderbyhallid").get(getFullRequestOrderByHallID);
router.route("/updatestatusrequestorder").post(auth, updateStatusRequestOrder);
router.route("/updatestatuspaid").post(auth, updateStatusPaid);

export default router;
