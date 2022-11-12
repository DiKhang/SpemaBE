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
    name: "refreshToken",
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

export const changePassValid: Validator[] = [
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

export const managerValid: Validator[] = [
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
