"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusPaidOrderValid = exports.updateStatusOrderValid = exports.updateRequestOrderValid = exports.addRequestOrderValid = exports.getFullTableOfHallValid = exports.updateHallValid = exports.updateTableValid = exports.addHallValid = exports.addTableValid = exports.updateGroupFoodValid = exports.addGroupFoodValid = exports.deleteFoodValid = exports.updateFoodValid = exports.addFoodValid = void 0;
exports.addFoodValid = [
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
exports.updateFoodValid = [
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
exports.deleteFoodValid = [
    {
        name: "id",
        type: "number",
        isRequire: true,
    },
];
exports.addGroupFoodValid = [
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
exports.updateGroupFoodValid = [
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
exports.addTableValid = [
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
exports.addHallValid = [
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
exports.updateTableValid = [
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
exports.updateHallValid = [
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
exports.getFullTableOfHallValid = [
    {
        name: "id",
        type: "number",
        isRequire: true,
    },
];
exports.addRequestOrderValid = [
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
exports.updateRequestOrderValid = [
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
exports.updateStatusOrderValid = [
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
exports.updateStatusPaidOrderValid = [
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
