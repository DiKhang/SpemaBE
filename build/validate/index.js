"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValid = exports.exampleValid = void 0;
const regex_1 = require("../utils/regex");
exports.exampleValid = [{}];
exports.registerValid = [
    {
        name: "username",
        type: "string",
        isRequire: true,
        regExp: regex_1.emailValid,
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
    },
];
