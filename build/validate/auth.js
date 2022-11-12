"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerValid = exports.changePassValid = exports.updateUserValid = exports.forgotPassValid = exports.loginValid = exports.resendCodeValid = exports.activeValid = exports.registerValid = void 0;
const regex_1 = require("../utils/regex");
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
        name: "gender",
        type: "string",
        isRequire: true,
    },
    {
        name: "jobName",
        type: "string",
        isRequire: true,
    },
];
exports.activeValid = [
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
exports.resendCodeValid = [
    {
        name: "username",
        type: "string",
        isRequire: true,
    },
];
exports.loginValid = [
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
        name: "refreshToken",
        type: "string",
    },
];
exports.forgotPassValid = [
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
exports.updateUserValid = [
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
        regExp: regex_1.phoneValid,
    },
    {
        name: "gender",
        type: "string",
    },
];
exports.changePassValid = [
    {
        name: "password",
        type: "string",
        isRequire: true,
    },
    {
        name: "newPassword",
        type: "string",
        isRequire: true,
    },
];
exports.managerValid = [
    {
        name: "active",
        type: "boolean",
        isRequire: true,
    },
    {
        name: "userID",
        type: "number",
        isRequire: true,
    },
];
