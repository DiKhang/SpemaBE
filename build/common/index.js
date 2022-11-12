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
exports.sendNotifi = exports.sendHistory = exports.getISOStringDate = exports.verifyPass = exports.hashPass = exports.generateCode = exports.uploadFile = exports.validate = exports.writeLog = void 0;
/** @format */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const firebase_1 = __importDefault(require("../utils/firebase"));
const system_1 = require("../service/system");
const socket_1 = require("../utils/socket");
const telegram_1 = require("../utils/telegram");
const nodemail_1 = require("../utils/nodemail");
const auth_1 = require("../service/auth");
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
const validate = (data, valid) => {
    try {
        let fields = Object.keys(data);
        for (var i = 0; i < valid.length; i++) {
            let item = valid[i];
            if (item.isRequire) {
                if (!fields.includes(item.name) || typeof data[item.name] != item.type) {
                    return false;
                }
            }
            if (item.regExp != undefined && typeof data[item.name] == "string") {
                if (!data[item.name].match(item.regExp)) {
                    return false;
                }
            }
        }
        for (var i = 0; i < fields.length; i++) {
            if (!valid.some((item) => item.name == fields[i])) {
                return false;
            }
        }
        return data;
    }
    catch (e) {
        console.log(e.message);
        return false;
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
const sendHistory = (content, userIDAction, actionObject) => __awaiter(void 0, void 0, void 0, function* () {
    var history = {
        actionObject: actionObject,
        content: content,
        time: getISOStringDate(new Date()),
        userIDAction: userIDAction,
    };
    yield (0, system_1.addHistory)(history);
    (0, telegram_1.botNotifi)(history.content);
    socket_1.io.emit(`${history.userIDAction}`, `${history}`);
});
exports.sendHistory = sendHistory;
const sendNotifi = (content, userID, actionObject) => __awaiter(void 0, void 0, void 0, function* () {
    var notifi = {
        actionObject: actionObject,
        content: content,
        time: getISOStringDate(new Date()),
        userID: userID,
    };
    const find = yield (0, auth_1.findUserByUserID)(userID);
    (0, nodemail_1.sendNotiMail)(find.username, `Xin chào anh/chị ${find.name},\nChúng tôi xin thông báo về tình trạng đơn hàng của bạn. \n${content}.\nQuý khách vui lòng theo dổi thông tin đơn hàng.Mọi chi tết xin liên hệ dikhang4study@gmail.com`);
    yield (0, system_1.addNotifi)(notifi);
    socket_1.io.emit(`${notifi.userID}`, `${notifi}`);
});
exports.sendNotifi = sendNotifi;
