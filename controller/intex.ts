/** @format */
import { NextFunction, Request, Response } from "express";
import { uploadFile } from "../common";
import fs from "fs";
import { findUserByUserID } from "../service/auth";

const handleUploadFile = async (req: any, res: Response, next: NextFunction) => {
	try {
		const file = req.file;
		const user = req.user;
		if (!file) {
			return next(new Error(`${404}:${"Please upload file !"}`));
		}

		const filePath = file.destination + "/" + file.filename;

		const find = await findUserByUserID(user.userID);

		if (!find || find.active == false) {
			fs.unlink(filePath, function (err) {});
			return next(new Error(`${404}:${"Cannot file user"}`));
		}

		if (user.role != "admin") {
			fs.unlink(filePath, function (err) {});
			return next(new Error(`${404}:${"Permisson denied"}`));
		}

		const host = "http://localhost:3000";

		const url = `${host}/${filePath}`;

		return res.send({
			status: true,
			data: url,
		});
	} catch (e: any) {
		return next(new Error(`${400}:${e.message}`));
	}
};

export { handleUploadFile };
