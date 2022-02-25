/** @format */

import { Validator } from "../interface";

export const addFoodValid: Validator[] = [
	{
		name: "name",
		type: "string",
		isRequire: true,
	},
	{
		name: "price",
		type: "number",
		isRequire: true,
	},
	{
		name: "category",
		type: "string",
		isRequire: true,
	},
	{
		name: "img",
		type: "string",
		isRequire: true,
	},
];

export const updateFoodValid: Validator[] = [
	{
		name: "name",
		type: "string",
		isRequire: true,
	},
	{
		name: "price",
		type: "number",
		isRequire: true,
	},
	{
		name: "category",
		type: "string",
		isRequire: true,
	},
	{
		name: "img",
		type: "string",
		isRequire: true,
	},
	{
		name: "id",
		type: "number",
		isRequire: true,
	},
];

export const deleteFoodValid: Validator[] = [
	{
		name: "id",
		type: "number",
		isRequire: true,
	},
];