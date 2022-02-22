/** @format */

import { Validator } from "../interface";
import { emailValid, phoneValid } from "../utils/regex";

export const registerValid: Validator[] = [
	{
		name: "username",
		type: "string",
		isRequire: true,
		regExp: emailValid,
	},
	{
		name: "password",
		type: "string",
		isRequire: true,
	},
	{
		name: "name",
		type: "string",
		isRequire: true,
	},
	{
		name: "birthDay",
		type: "string",
		isRequire: true,
	},
	{
		name: "phone",
		type: "string",
		isRequire: true,
		regExp: phoneValid,
	},
];
