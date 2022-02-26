/** @format */

import { Validator } from "../interface";
import { phoneValid } from "../utils/regex";

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
	{
		name: "decription",
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
	{
		name: "decription",
		type: "string",
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

export const addGroupFoodValid: Validator[] = [
	{
		name: "name",
		type: "string",
		isRequire: true,
	},
	{
		name: "listFood",
		type: "object",
		isRequire: true,
	},
	{
		name: "decription",
		type: "string",
		isRequire: true,
	},
];

export const updateGroupFoodValid: Validator[] = [
	{
		name: "name",
		type: "string",
		isRequire: true,
	},
	{
		name: "listFood",
		type: "object",
		isRequire: true,
	},
	{
		name: "decription",
		type: "string",
		isRequire: true,
	},
	{
		name: "id",
		type: "number",
		isRequire: true,
	},
];

export const addTableValid: Validator[] = [
	{
		name: "name",
		type: "string",
		isRequire: true,
	},
	{
		name: "sizeOnTable",
		type: "number",
		isRequire: true,
	},
	{
		name: "hallID",
		type: "number",
		isRequire: true,
	},
];

export const addHallValid: Validator[] = [
	{
		name: "name",
		type: "string",
		isRequire: true,
	},
	{
		name: "size",
		type: "number",
		isRequire: true,
	},
	{
		name: "type",
		type: "string",
		isRequire: true,
	},
];

export const updateTableValid: Validator[] = [
	{
		name: "name",
		type: "string",
		isRequire: true,
	},
	{
		name: "sizeOnTable",
		type: "number",
		isRequire: true,
	},
	{
		name: "id",
		type: "number",
		isRequire: true,
	},
];

export const updateHallValid: Validator[] = [
	{
		name: "id",
		type: "number",
		isRequire: true,
	},
	{
		name: "name",
		type: "string",
		isRequire: true,
	},
	{
		name: "size",
		type: "number",
		isRequire: true,
	},
	{
		name: "type",
		type: "string",
		isRequire: true,
	},
];

export const getFullTableOfHallValid: Validator[] = [
	{
		name: "id",
		type: "number",
		isRequire: true,
	},
];

export const addRequestOrderValid: Validator[] = [
	{
		name: "type",
		type: "string",
		isRequire: true,
	},
	{
		name: "hallID",
		type: "number",
		isRequire: true,
	},
	{
		name: "totalMoney",
		type: "number",
		isRequire: true,
	},
	{
		name: "tableID",
		type: "object",
		isRequire: true,
	},
	{
		name: "listFood",
		type: "object",
		isRequire: true,
	},
	{
		name: "note",
		type: "string",
		isRequire: true,
	},
	{
		name: "timeStart",
		type: "string",
		isRequire: true,
	},
];

export const updateRequestOrderValid: Validator[] = [
	{
		name: "type",
		type: "string",
		isRequire: true,
	},
	{
		name: "hallID",
		type: "number",
		isRequire: true,
	},
	{
		name: "totalMoney",
		type: "number",
		isRequire: true,
	},
	{
		name: "tableID",
		type: "object",
		isRequire: true,
	},
	{
		name: "listFood",
		type: "object",
		isRequire: true,
	},
	{
		name: "note",
		type: "string",
		isRequire: true,
	},
	{
		name: "timeStart",
		type: "string",
		isRequire: true,
	},
	{
		name: "id",
		type: "number",
		isRequire: true,
	},
];

export const updateStatusOrderValid: Validator[] = [
	{
		name: "status",
		type: "string",
		isRequire: true,
	},
	{
		name: "id",
		type: "number",
		isRequire: true,
	},
];

export const updateStatusPaidOrderValid: Validator[] = [
	{
		name: "isPaid",
		type: "string",
		isRequire: true,
	},
	{
		name: "id",
		type: "number",
		isRequire: true,
	},
];
