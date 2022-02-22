/** @format */
import { Response, Request, NextFunction } from "express";
import { generateCode, getISOStringDate, hashPass, validate } from "../../common";
import { User } from "../../interface/auth";
import { addUser, findUser, getAllUser } from "../../service/auth";
import { sendCode } from "../../utils/nodemail";
import { registerValid } from "../../validate";

const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		var body = req.body;
		var validBody: any = validate(body, registerValid, next);
		var now = new Date();

		if (!validBody) {
			return next(new Error(`${500}:${`Validate data fail`}`));
		}

		const find = await findUser(validBody.username);

		//username has exist
		if (find) {
			return next(new Error(`${500}:${`Username has exist !`}`));
		}

		//get All user
		const allUser = await getAllUser();

		//generate code active
		const code = generateCode();

		//send code to mail
		const send = await sendCode(validBody.username, code);

		//check send code done
		if (!send) {
			return next(new Error(`${500}:${`Register fail send code active fail !`}`));
		}

		var user: User = {
			active: false,
			birthDay: validBody.birthDay,
			activeAt: "",
			createAt: getISOStringDate(now),
			code: code,
			name: validBody.name,
			password: await hashPass(validBody.password),
			phone: validBody.phone,
			rank: "normal",
			userID: allUser.length + 1,
			username: validBody.username,
		};

		//insert user
		const add = await addUser(user);

		//check add user success
		if (add) {
			console.log(`Add user ${add.toString()} Success !`);
		} else {
			return next(new Error(`${500}:${`Add user fail, insert user error .`}`));
		}

		//send user object
		return res.send(user);
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

export { register };
