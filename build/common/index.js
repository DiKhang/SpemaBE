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
exports.getISOStringDate = exports.verifyPass = exports.hashPass = exports.generateCode = exports.uploadFile = exports.validate = exports.writeLog = void 0;
/** @format */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const firebase_1 = __importDefault(require("../utils/firebase"));
const writeLog = (code, message, req) => {
    let logPath = path_1.default.join(process.cwd(), "logs", "logs.csv");
    let date = new Date().toString();
    let body = JSON.stringify(req.body);
    let headers = JSON.stringify(req.headers);
    let ip = req.ip;
    let hostname = req.hostname;
    let row = `${date},${code},${message},${hostname},${ip},${body}.${headers}\n`;
    fs_1.default.readFile(logPath, "utf8", (err, data) => {
        data += row;
        fs_1.default.writeFile(logPath, data, (err) => {
            if (err) {
                console.log("Error writing log to csv file", err);
            }
            else {
                console.log(`Write log done !`);
            }
        });
    });
};
exports.writeLog = writeLog;
const validate = (data, valid, next) => {
    try {
        let fields = Object.keys(data);
        for (var i = 0; i < valid.length; i++) {
            let item = valid[i];
            if (item.isRequire) {
                if (!fields.includes(item.name) || typeof data[item.name] != item.type) {
                    throw next(new Error(`${400}:${"Validate data fail !"}`));
                }
                else {
                    if (item.regExp != undefined && typeof data[item.name] == "string") {
                        if (!data[item.name].match(item.regExp)) {
                            throw next(new Error(`${400}:${"Validate data fail !"}`));
                        }
                    }
                }
            }
        }
        throw data;
    }
    catch (e) {
        throw next(new Error(`${400}:${"Validate data fail !"}`));
    }
};
exports.validate = validate;
const hashPass = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const hash = yield bcrypt_1.default.hash(password, saltRounds);
    return hash;
});
exports.hashPass = hashPass;
const verifyPass = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt_1.default.compare(password, hash);
    return result;
});
exports.verifyPass = verifyPass;
const generateCode = () => {
    var code = "";
    for (var i = 0; i < 5; i++) {
        code += Math.floor(Math.random() * (9 - 0) + 0);
    }
    return code;
};
exports.generateCode = generateCode;
const uploadFile = (file, destination) => __awaiter(void 0, void 0, void 0, function* () {
    var result = true;
    const filePath = file.destination + file.filename;
    yield firebase_1.default
        .storage()
        .bucket()
        .upload(filePath, {
        destination: destination + file.filename,
        public: true,
    })
        .then((res) => {
        result = res[0].metadata.mediaLink;
    })
        .catch((e) => {
        console.log(e);
        result = false;
    });
    fs_1.default.unlink(filePath, function (err) { });
    return result;
});
exports.uploadFile = uploadFile;
const getISOStringDate = (date) => {
    date.setDate(date.getDate() + 7);
    return date.toISOString();
};
exports.getISOStringDate = getISOStringDate;
