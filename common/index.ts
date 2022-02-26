/** @format */
import fs from "fs";
import path from "path";
import { Validator } from "../interface";
import bcrypt from "bcrypt";
import admin from "../utils/firebase";
import { History, Notifi } from "../interface/system";
import { addHistory, addNotifi } from "../service/system";
import { io } from "../utils/socket";

const writeLog = (code: any, message: any, req: any) => {
	let logPath = path.join(process.cwd(), "logs", "logs.csv");
	let date = new Date().toString();
	let body = JSON.stringify(req.body);
	let headers = JSON.stringify(req.headers);
	let ip = req.ip;
	let hostname = req.hostname;
	let row = `${date},${code},${message},${hostname},${ip},${body}.${headers}\n`;
	fs.readFile(logPath, "utf8", (err, data) => {
		data += row;
		fs.writeFile(logPath, data, (err) => {
			if (err) {
				console.log("Error writing log to csv file", err);
			} else {
				console.log(`Write log done !`);
			}
		});
	});
};

const validate = (data: any, valid: Validator[]) => {
	try {
		let fields = Object.keys(data);
		for (var i = 0; i < valid.length; i++) {
			let item = valid[i];
			if (item.isRequire) {
				if (!fields.includes(item.name) || typeof data[item.name] != item.type) {
					return false;
				}
			}
			if (item.regExp != undefined && typeof data[item.name] == "string") {
				if (!data[item.name].match(item.regExp)) {
					return false;
				}
			}
		}

		for (var i = 0; i < fields.length; i++) {
			if (!valid.some((item) => item.name == fields[i])) {
				return false;
			}
		}

		return data;
	} catch (e: any) {
		console.log(e.message);
		return false;
	}
};

const hashPass = async (password: string) => {
	const saltRounds = 10;
	const hash = await bcrypt.hash(password, saltRounds);
	return hash;
};

const verifyPass = async (password: string, hash: string) => {
	const result = await bcrypt.compare(password, hash);
	return result;
};

const generateCode = () => {
	var code = "";
	for (var i = 0; i < 5; i++) {
		code += Math.floor(Math.random() * (9 - 0) + 0);
	}
	return code;
};

const uploadFile = async (file: any, destination: any) => {
	var result = true;
	const filePath = file.destination + file.filename;
	await admin
		.storage()
		.bucket()
		.upload(filePath, {
			destination: destination + file.filename,
			public: true,
		})
		.then((res: any) => {
			result = res[0].metadata.mediaLink;
		})
		.catch((e: any) => {
			console.log(e);
			result = false;
		});
	fs.unlink(filePath, function (err) {});
	return result;
};

const getISOStringDate = (date: Date) => {
	date.setDate(date.getDate() + 7);
	return date.toISOString();
};

const sendHistory = async (content: string, userIDAction: number, actionObject: object) => {
	var history: History = {
		actionObject: actionObject,
		content: content,
		time: getISOStringDate(new Date()),
		userIDAction: userIDAction,
	};

	await addHistory(history);

	io.emit(`${history.userIDAction}`, `${history}`);
};

const sendNotifi = async (content: string, userID: number, actionObject: object) => {
	var notifi: Notifi = {
		actionObject: actionObject,
		content: content,
		time: getISOStringDate(new Date()),
		userID: userID,
	};

	await addNotifi(notifi);

	io.emit(`${notifi.userID}`, `${notifi}`);
};

export {
	writeLog,
	validate,
	uploadFile,
	generateCode,
	hashPass,
	verifyPass,
	getISOStringDate,
	sendHistory,
	sendNotifi,
};
