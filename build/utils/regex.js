"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneValid = exports.emailValid = void 0;
exports.emailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.phoneValid = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
