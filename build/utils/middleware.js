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
exports.upload = exports.auth = void 0;
const jwt_1 = require("./jwt");
const multer_1 = __importDefault(require("multer"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = ((_a = req.headers["jwt"]) === null || _a === void 0 ? void 0 : _a.replace("JWT ", "")) || false;
    if (!token)
        return next(new Error(`${404}:Not found token !`));
    const decode = (0, jwt_1.verifyToken)(token);
    if (!decode)
        return next(new Error(`${403}:Forbidden !`));
    delete decode.exp;
    delete decode.iat;
    req.user = decode;
    return next();
});
exports.auth = auth;
// SET STORAGE
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const originalname = file.originalname;
        const mineType = originalname.slice(originalname.indexOf("."), originalname.length);
        const filename = file.fieldname + "-" + uniqueSuffix + mineType;
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.upload = upload;
