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
	{
		name: "gender",
		type: "string",
		isRequire: true,
	},
];

export const activeValid: Validator[] = [
	{
		name: "username",
		type: "string",
		isRequire: true,
	},
	{
		name: "code",
		type: "string",
		isRequire: true,
	},
];

export const resendCodeValid: Validator[] = [
	{
		name: "username",
		type: "string",
		isRequire: true,
	},
];

export const loginValid: Validator[] = [
	{
		name: "username",
		type: "string",
		isRequire: true,
	},
	{
		name: "password",
		type: "string",
		isRequire: true,
	},
	{
		name: "accessToken",
		type: "string",
	},
];

export const forgotPassValid: Validator[] = [
	{
		name: "username",
		type: "string",
		isRequire: true,
	},
	{
		name: "password",
		type: "string",
		isRequire: true,
	},
	{
		name: "code",
		type: "string",
		isRequire: true,
	},
];

export const updateUserValid: Validator[] = [
	{
		name: "name",
		type: "string",
	},
	{
		name: "birthDay",
		type: "string",
	},
	{
		name: "phone",
		type: "string",
		regExp: phoneValid,
	},
	{
		name: "gender",
		type: "string",
	},
];
