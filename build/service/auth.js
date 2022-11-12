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
exports.updateActiveByUserID = exports.updatePassByUserID = exports.updateProfile = exports.findUserByUserID = exports.updatePass = exports.updateCode = exports.activeUser = exports.addUser = exports.getAllUser = exports.findUser = void 0;
/** @format */
const common_1 = require("../common");
const mongodb_1 = __importDefault(require("../utils/mongodb"));
const findUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const find = yield mongodb_1.default.collection("User").findOne({
        username: username,
    });
    return find;
});
exports.findUser = findUser;
const findUserByUserID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const find = yield mongodb_1.default.collection("User").findOne({
        userID: userID,
    });
    return find;
});
exports.findUserByUserID = findUserByUserID;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const find = yield mongodb_1.default.collection("User").find({}).toArray();
    return find;
});
exports.getAllUser = getAllUser;
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const add = yield mongodb_1.default.collection("User").insertOne(user);
        return add.insertedId;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
});
exports.addUser = addUser;
const activeUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield mongodb_1.default.collection("User").updateOne({
            username: username,
        }, {
            $set: {
                active: true,
                activeAt: (0, common_1.getISOStringDate)(new Date()),
            },
        });
        return update.matchedCount;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
});
exports.activeUser = activeUser;
const updateCode = (username, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield mongodb_1.default.collection("User").updateOne({
            username: username,
        }, {
            $set: {
                code: code,
            },
        });
        return update.matchedCount;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
});
exports.updateCode = updateCode;
const updatePass = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield mongodb_1.default.collection("User").updateOne({
            username: username,
        }, {
            $set: {
                password: password,
            },
        });
        return update.matchedCount;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
});
exports.updatePass = updatePass;
const updateProfile = (userID, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield mongodb_1.default.collection("User").updateOne({
            userID: userID,
        }, {
            $set: Object.assign({}, user),
        });
        return update.matchedCount;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
});
exports.updateProfile = updateProfile;
const updatePassByUserID = (userID, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield mongodb_1.default.collection("User").updateOne({
            userID: userID,
        }, {
            $set: {
                password: password,
            },
        });
        return update.matchedCount;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
});
exports.updatePassByUserID = updatePassByUserID;
const updateActiveByUserID = (userID, active) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield mongodb_1.default.collection("User").updateOne({
            userID: userID,
        }, {
            $set: {
                active: active,
            },
        });
        return update.matchedCount;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
});
exports.updateActiveByUserID = updateActiveByUserID;
