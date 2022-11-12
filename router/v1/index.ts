/** @format */

import express from "express";
import { Response, Request, NextFunction } from "express";
import { handleUploadFile } from "../../controller/intex";
import { auth, upload } from "../../utils/middleware";
import authRouter from "./auth";
import systemRouter from "./system";

const router = express.Router();

router.get("/", (req: Request, res: Response) =>
  res.send("Wellcome to api v1 !")
);
router
  .route("/uploadfile")
  .post(auth, upload.single("filename"), handleUploadFile);

router.use("/auth", authRouter);
router.use("/system", systemRouter);

export default router;
