"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const signToken = (payLoad) => {
    var keyPath = path_1.default.join(process.cwd(), "key", "private.key");
    var privateKey = fs_1.default.readFileSync(keyPath).toString();
    var token = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, payLoad), { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }), //token exp 24h
    privateKey, { algorithm: "RS256" });
    return token;
};
exports.signToken = signToken;
const verifyToken = (token) => {
    var keyPath = path_1.default.join(process.cwd(), "key", "public.key");
    var publicKey = fs_1.default.readFileSync(keyPath).toString();
    try {
        var decode = jsonwebtoken_1.default.verify(token, publicKey, { algorithms: ["RS256"] });
        return decode;
    }
    catch (e) {
        return false;
    }
};
exports.verifyToken = verifyToken;
