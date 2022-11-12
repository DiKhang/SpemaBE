import express from "express";
import { insertMany, getMany, updateOne } from "../../controller/v1/system";
import { auth } from "../../utils/middleware";
const router = express.Router();

router.route("/inserts").post(auth, insertMany);
router.route("/gets").post(auth, getMany);
router.route("/update").post(auth, updateOne);

export default router;
