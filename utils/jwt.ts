/** @format */

import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export const signToken = (payLoad: object) => {
	var keyPath = path.join(process.cwd(), "key", "private.key");
	var privateKey = fs.readFileSync(keyPath).toString();
	var token = jwt.sign(
		{ ...payLoad, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, //token exp 24h
		privateKey,
		{ algorithm: "RS256" },
	);
	return token;
};

export const verifyToken = (token: string) => {
	var keyPath = path.join(process.cwd(), "key", "public.key");
	var publicKey = fs.readFileSync(keyPath).toString();
	try {
		var decode = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
		return decode;
	} catch (e) {
		return false;
	}
};
