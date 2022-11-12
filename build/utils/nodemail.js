"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotiMail = exports.sendCode = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
var transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "dikhang4study@gmail.com",
        pass: "acjojxiafsrzzmsk", //geaaggaplmofygev
    },
});
const sendCode = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    var result = true;
    var mailOptions = {
        from: "nguyenduykhuongtqtpy@gmail.com",
        to: to,
        subject: "Verify code to active account !",
        text: `Your code : ${code}`,
    };
    yield transporter.sendMail(mailOptions).catch((e) => {
        console.log(e.message);
        result = false;
    });
    return result;
});
exports.sendCode = sendCode;
const sendNotiMail = (to, content) => __awaiter(void 0, void 0, void 0, function* () {
    var result = true;
    var mailOptions = {
        from: "nguyenduykhuongtqtpy@gmail.com",
        to: to,
        subject: "Notifi from Restaurant",
        text: `${content}`,
    };
    yield transporter.sendMail(mailOptions).catch((e) => {
        console.log(e.message);
        result = false;
    });
    return result;
});
exports.sendNotiMail = sendNotiMail;
