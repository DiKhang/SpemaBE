import express from "express";
import { insertMany, getOne, updateOne } from "../../controller/v1/system";
import { auth } from "../../utils/middleware";
const router = express.Router();

router.route("/inserts").post(auth, insertMany);
router.route("/get").post(auth, getOne);
router.route("/update").post(auth, updateOne);

export default router;
