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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const common_1 = require("../../common");
const auth_1 = require("../../service/auth");
const validate_1 = require("../../validate");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = req.body;
        var validBody = (0, common_1.validate)(body, validate_1.registerValid, next);
        var now = new Date();
        const find = yield (0, auth_1.findUser)(validBody.username);
        //username has exist
        if (!find) {
            throw next(new Error(`${500}:${`Username has exist !`}`));
        }
        //get All user
        const allUser = yield (0, auth_1.getAllUser)();
        var user = {
            active: false,
            birthDay: validBody.birthDay,
            activeAt: "",
            createAt: (0, common_1.getISOStringDate)(now),
            code: "",
            name: validBody.name,
            password: yield (0, common_1.hashPass)(validBody.password),
            phone: validBody.phone,
            rank: "normal",
            userID: allUser.length + 1,
            username: validBody.username,
        };
        //insert user
        const add = yield (0, auth_1.addUser)(user);
        if (add) {
            console.log(`Add user ${add.toString()} Success !`);
        }
        else {
            throw next(new Error(`${500}:${`Add user fail, insert user error .`}`));
        }
        return res.send(user);
    }
    catch (e) {
        throw next(new Error(`${500}:${e.message}`));
    }
});
exports.register = register;
