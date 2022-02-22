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
exports.addUser = exports.getAllUser = exports.findUser = void 0;
const mongodb_1 = __importDefault(require("../utils/mongodb"));
const findUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const find = yield mongodb_1.default.collection("User").findOne({
        username: username,
    });
    return find;
});
exports.findUser = findUser;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const find = yield mongodb_1.default.collection("User").find({}).toArray();
    return find;
});
exports.getAllUser = getAllUser;
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addUser = yield mongodb_1.default.collection("User").insertOne(user);
        return addUser.insertedId;
    }
    catch (e) {
        console.log(e);
        return false;
    }
});
exports.addUser = addUser;
