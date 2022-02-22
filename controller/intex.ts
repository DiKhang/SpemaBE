/** @format */
import { NextFunction, Request, Response } from "express";
import { uploadFile } from "../common";

const handleUploadFile = async (req: any, res: Response, next: NextFunction) => {
	try {
		const file = req.file;
		if (!file) {
			return next(new Error(`${404}:${"Please upload file !"}`));
		}

		//upload file on firebase storange
		const upload = await uploadFile(req.file, `file/${req.user.username}/`);
		if (!upload) {
			return next(new Error(`${400}:${"Upload file fail!"}`));
		}

		return res.send({
			status: true,
			data: upload,
		});
	} catch (e: any) {
		return next(new Error(`${400}:${e.message}`));
	}
};

export { handleUploadFile };
