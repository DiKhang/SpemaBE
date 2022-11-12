"use strict";
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
exports.handleUploadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const auth_1 = require("../service/auth");
const handleUploadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        const user = req.user;
        if (!file) {
            return next(new Error(`${404}:${"Please upload file !"}`));
        }
        const filePath = file.destination + "/" + file.filename;
        const find = yield (0, auth_1.findUserByUserID)(user.userID);
        if (!find || find.active == false) {
            fs_1.default.unlink(filePath, function (err) { });
            return next(new Error(`${404}:${"Cannot file user"}`));
        }
        if (user.role != "admin") {
            fs_1.default.unlink(filePath, function (err) { });
            return next(new Error(`${404}:${"Permisson denied"}`));
        }
        const host = "http://localhost:3000";
        const url = `${host}/${filePath}`;
        return res.send({
            status: true,
            data: url,
        });
    }
    catch (e) {
        return next(new Error(`${400}:${e.message}`));
    }
});
exports.handleUploadFile = handleUploadFile;
