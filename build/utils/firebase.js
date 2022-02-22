"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
const firebaseadminkey_json_1 = __importDefault(require("../key/firebaseadminkey.json"));
admin.initializeApp({
    credential: admin.credential.cert(firebaseadminkey_json_1.default),
    storageBucket: "megatalk-a65f4.appspot.com/",
});
exports.default = admin;
