/** @format */

import { verifyToken } from "./jwt";
import multer from "multer";

const auth = async (req: any, res: any, next: any) => {
	const token = req.headers["jwt"]?.replace("JWT ", "") || false;
	if (!token) return next(new Error(`${404}:Not found token !`));
	const decode: any = verifyToken(token);
	if (!decode) return next(new Error(`${403}:Forbidden !`));
	delete decode.exp;
	delete decode.iat;
	req.user = decode;
	return next();
};

// SET STORAGE
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const originalname = file.originalname;
		const mineType = originalname.slice(originalname.indexOf("."), originalname.length);
		const filename = file.fieldname + "-" + uniqueSuffix + mineType;
		cb(null, filename);
	},
});

const upload = multer({ storage: storage });

export { auth, upload };
