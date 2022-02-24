/** @format */
import { Response, Request, NextFunction } from "express";
import { generateCode, getISOStringDate, hashPass, validate, verifyPass } from "../../common";
import { User } from "../../interface/auth";
import {
	activeUser,
	addUser,
	findUser,
	getAllUser,
	updateCode,
	updatePass,
} from "../../service/auth";
import { signToken, verifyToken } from "../../utils/jwt";
import { sendCode as sendMail } from "../../utils/nodemail";
import {
	activeValid,
	forgotPassValid,
	loginValid,
	registerValid,
	resendCodeValid,
} from "../../validate";

const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		var body = req.body;
		var validBody: any = validate(body, registerValid);
		var now = new Date();

		if (!validBody) {
			return next(new Error(`${500}:${`Validate data fail`}`));
		}

		const find: any = await findUser(validBody.username);

		//username has exist
		if (find) {
			return next(new Error(`${500}:${`Username has exist !`}`));
		}

		//get All user
		const allUser = await getAllUser();

		//generate code active
		const code = generateCode();

		//send code to mail
		const send = await sendMail(validBody.username, code);

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
		return res.send({
			status: true,
			data: user,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		var body = req.body;
		var validBody: any = validate(body, loginValid);

		if (!validBody) {
			return next(new Error(`${500}:${`Validate data fail`}`));
		}

		const find: any = await findUser(validBody.username);

		if (!find) {
			return next(new Error(`${500}:${`Cannot find user`}`));
		}

		var accessToken = "";
		var refreshToken = "";

		//create new accessToken if have refreshToken in body
		if (validBody.refreshToken && verifyToken(validBody.refreshToken)) {
			delete find.password;
			delete find.code;
			accessToken = signToken(find);
			refreshToken = signToken(find, true);
		} else {
			const passValid = await verifyPass(validBody.password, find.password);

			if (!passValid) {
				return next(new Error(`${500}:${`Password wrong `}`));
			}

			delete find.password;
			delete find.code;

			accessToken = signToken(find);
			refreshToken = signToken(find, true);
		}

		return res.send({
			status: true,
			data: {
				accessToken,
				refreshToken,
			},
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const active = async (req: Request, res: Response, next: NextFunction) => {
	try {
		var body = req.body;
		var validBody: any = validate(body, activeValid);

		if (!validBody) {
			return next(new Error(`${500}:${`Validate data fail`}`));
		}

		const find: any = await findUser(validBody.username);

		if (!find) {
			return next(new Error(`${500}:${`Cannot find user !`}`));
		}

		if (find.active) {
			return next(new Error(`${500}:${`User is active !`}`));
		}

		if (validBody.code != find.code) {
			return next(new Error(`${500}:${`Code wrong !`}`));
		}

		const active = await activeUser(validBody.username);

		if (!active) return next(new Error(`${500}:${"Active fail cannot update db !"}`));

		delete find.password;

		return res.send({
			status: true,
			data: find,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const sendCode = async (req: Request, res: Response, next: NextFunction) => {
	try {
		var body = req.body;
		var validBody: any = validate(body, resendCodeValid);

		if (!validBody) {
			return next(new Error(`${500}:${`Validate data fail`}`));
		}

		const find: any = await findUser(validBody.username);

		if (!find) {
			return next(new Error(`${500}:${`Cannot find user`}`));
		}

		//generate code active
		const code = generateCode();

		//send code to mail
		const send = await sendMail(validBody.username, code);

		//check send code done
		if (!send) {
			return next(new Error(`${500}:${`Resend code fail send code fail !`}`));
		}

		const update = await updateCode(validBody.username, code);

		if (!update) {
			return next(new Error(`${500}:${`Resend code fail cannot update db !`}`));
		}

		return res.send({
			status: true,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const forgotPass = async (req: Request, res: Response, next: NextFunction) => {
	try {
		var body = req.body;
		var validBody: any = validate(body, forgotPassValid);

		if (!validBody) {
			return next(new Error(`${500}:${`Validate data fail`}`));
		}

		const find: any = await findUser(validBody.username);

		if (!find) {
			return next(new Error(`${500}:${`Cannot find user`}`));
		}

		if (find.code != validBody.code) {
			return next(new Error(`${500}:${`Code wrong `}`));
		}

		const newPassword = await hashPass(validBody.password);

		const update = await updatePass(validBody.username, newPassword);

		if (!update) {
			return next(new Error(`${500}:${`Forgot pass fail cannot update db !`}`));
		}

		return res.send({
			status: true,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

export { register, login, active, sendCode, forgotPass };
