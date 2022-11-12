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
exports.getUser = exports.getFullUser = exports.manager = exports.changePass = exports.updateUser = exports.forgotPass = exports.sendCode = exports.active = exports.login = exports.register = void 0;
const common_1 = require("../../common");
const auth_1 = require("../../service/auth");
const jwt_1 = require("../../utils/jwt");
const nodemail_1 = require("../../utils/nodemail");
const auth_2 = require("../../validate/auth");
const uuid_1 = require("uuid");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = req.body;
        var validBody = (0, common_1.validate)(body, auth_2.registerValid);
        var now = new Date();
        if (!validBody) {
            return next(new Error(`${500}:${`Validate data fail`}`));
        }
        const find = yield (0, auth_1.findUser)(validBody.username);
        //username has exist
        if (find) {
            return next(new Error(`${500}:${`Username has exist !`}`));
        }
        //generate code active
        const code = (0, common_1.generateCode)();
        //send code to mail
        const send = yield (0, nodemail_1.sendCode)(validBody.username, code);
        //check send code done
        if (!send) {
            return next(new Error(`${500}:${`Register fail send code active fail !`}`));
        }
        var user = {
            active: false,
            birthDay: validBody.birthDay,
            activeAt: "",
            createAt: (0, common_1.getISOStringDate)(now),
            code: code,
            name: validBody.name,
            password: yield (0, common_1.hashPass)(validBody.password),
            gender: validBody.gender,
            userID: (0, uuid_1.v4)(),
            username: validBody.username,
            jobName: validBody.jobName,
            role: "user",
        };
        //insert user
        const add = yield (0, auth_1.addUser)(user);
        //check add user success
        if (add) {
            console.log(`Add user ${add.toString()} Success !`);
        }
        else {
            return next(new Error(`${500}:${`Add user fail, insert user error .`}`));
        }
        delete user.password;
        //send user object
        return res.send({
            status: true,
            data: user,
        });
    }
    catch (e) {
        return next(new Error(`${500}:${e.message}`));
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = req.body;
        var validBody = (0, common_1.validate)(body, auth_2.loginValid);
        if (!validBody) {
            return next(new Error(`${500}:${`Validate data fail`}`));
        }
        const find = yield (0, auth_1.findUser)(validBody.username);
        if (!find) {
            return next(new Error(`${500}:${`Cannot find user`}`));
        }
        if (!find.active) {
            return next(new Error(`${500}:${`Account not active`}`));
        }
        var accessToken = "";
        var refreshToken = "";
        //create new accessToken if have refreshToken in body
        if (validBody.refreshToken && (0, jwt_1.verifyToken)(validBody.refreshToken)) {
            delete find.password;
            delete find.code;
            accessToken = (0, jwt_1.signToken)(find);
            refreshToken = (0, jwt_1.signToken)(find, true);
        }
        else {
            const passValid = yield (0, common_1.verifyPass)(validBody.password, find.password);
            if (!passValid) {
                return next(new Error(`${500}:${`Password wrong `}`));
            }
            delete find.password;
            delete find.code;
            accessToken = (0, jwt_1.signToken)(find);
            refreshToken = (0, jwt_1.signToken)(find, true);
        }
        return res.send({
            status: true,
            data: {
                accessToken,
                refreshToken,
            },
        });
    }
    catch (e) {
        return next(new Error(`${500}:${e.message}`));
    }
});
exports.login = login;
const active = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = req.body;
        var validBody = (0, common_1.validate)(body, auth_2.activeValid);
        if (!validBody) {
            return next(new Error(`${500}:${`Validate data fail`}`));
        }
        const find = yield (0, auth_1.findUser)(validBody.username);
        if (!find) {
            return next(new Error(`${500}:${`Cannot find user !`}`));
        }
        if (find.active) {
            return next(new Error(`${500}:${`User is active !`}`));
        }
        if (validBody.code != find.code) {
            return next(new Error(`${500}:${`Code wrong !`}`));
        }
        const active = yield (0, auth_1.activeUser)(validBody.username);
        if (!active)
            return next(new Error(`${500}:${"Active fail cannot update db !"}`));
        delete find.password;
        return res.send({
            status: true,
            data: Object.assign(Object.assign({}, find), { active: true }),
        });
    }
    catch (e) {
        return next(new Error(`${500}:${e.message}`));
    }
});
exports.active = active;
const sendCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = req.body;
        var validBody = (0, common_1.validate)(body, auth_2.resendCodeValid);
        if (!validBody) {
            return next(new Error(`${500}:${`Validate data fail`}`));
        }
        const find = yield (0, auth_1.findUser)(validBody.username);
        if (!find) {
            return next(new Error(`${500}:${`Cannot find user`}`));
        }
        //generate code active
        const code = (0, common_1.generateCode)();
        //send code to mail
        const send = yield (0, nodemail_1.sendCode)(validBody.username, code);
        //check send code done
        if (!send) {
            return next(new Error(`${500}:${`Resend code fail send code fail !`}`));
        }
        const update = yield (0, auth_1.updateCode)(validBody.username, code);
        if (!update) {
            return next(new Error(`${500}:${`Resend code fail cannot update db !`}`));
        }
        return res.send({
            status: true,
        });
    }
    catch (e) {
        return next(new Error(`${500}:${e.message}`));
    }
});
exports.sendCode = sendCode;
const forgotPass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = req.body;
        var validBody = (0, common_1.validate)(body, auth_2.forgotPassValid);
        if (!validBody) {
            return next(new Error(`${500}:${`Validate data fail`}`));
        }
        const find = yield (0, auth_1.findUser)(validBody.username);
        if (!find) {
            return next(new Error(`${500}:${`Cannot find user`}`));
        }
        if (find.code != validBody.code) {
            return next(new Error(`${500}:${`Code wrong `}`));
        }
        const newPassword = yield (0, common_1.hashPass)(validBody.password);
        const update = yield (0, auth_1.updatePass)(validBody.username, newPassword);
        if (!update) {
            return next(new Error(`${500}:${`Forgot pass fail cannot update db !`}`));
        }
        return res.send({
            status: true,
        });
    }
    catch (e) {
        return next(new Error(`${500}:${e.message}`));
    }
});
exports.forgotPass = forgotPass;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = req.body;
        var validBody = (0, common_1.validate)(body, auth_2.updateUserValid);
        var user = req.user;
        if (!validBody) {
            return next(new Error(`${500}:${`Validate data fail`}`));
        }
        const find = yield (0, auth_1.findUserByUserID)(user.userID);
        if (!find) {
            return next(new Error(`${500}:${`Cannot find user`}`));
        }
        const update = yield (0, auth_1.updateProfile)(user.userID, validBody);
        if (!update) {
            return next(new Error(`${500}:${`Update profile fail cannot update db !`}`));
        }
        return res.send({
            status: true,
            data: Object.assign({}, validBody),
        });
    }
    catch (e) {
        return next(new Error(`${500}:${e.message}`));
    }
});
exports.updateUser = updateUser;
const changePass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = req.body;
        var validBody = (0, common_1.validate)(body, auth_2.changePassValid);
        var user = req.user;
        if (!validBody) {
            return next(new Error(`${500}:${`Validate data fail`}`));
        }
        const find = yield (0, auth_1.findUserByUserID)(user.userID);
        if (!find) {
            return next(new Error(`${500}:${`Cannot find user`}`));
        }
        const validPass = yield (0, common_1.verifyPass)(validBody.password, find.password);
        if (!validPass) {
            return next(new Error(`${500}:${`Password wrong`}`));
        }
        const newPassword = yield (0, common_1.hashPass)(validBody.newPassword);
        const update = yield (0, auth_1.updatePassByUserID)(user.userID, newPassword);
        if (!update) {
            return next(new Error(`${500}:${`Update pass fail cannot update db`}`));
        }
        return res.send({
            status: true,
        });
    }
    catch (e) {
        return next(new Error(`${500}:${e.message}`));
    }
});
exports.changePass = changePass;
const manager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var body = req.body;
        var validBody = (0, common_1.validate)(body, auth_2.managerValid);
        var user = req.user;
        if (!validBody) {
            return next(new Error(`${500}:${`Validate data fail`}`));
        }
        const find = yield (0, auth_1.findUserByUserID)(user.userID);
        if (!find) {
            return next(new Error(`${500}:${`Cannot find user`}`));
        }
        if (user.role != "admin") {
            return next(new Error(`${500}:${`Permisson dined `}`));
        }
        var update = yield (0, auth_1.updateActiveByUserID)(validBody.userID, validBody.active);
        if (!update) {
            return next(new Error(`${500}:${`Update active fail cannot update db`}`));
        }
        return res.send({
            status: true,
        });
    }
    catch (e) {
        return next(new Error(`${500}:${e.message}`));
    }
});
exports.manager = manager;
const getFullUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var user = req.user;
        const find = yield (0, auth_1.findUserByUserID)(user.userID);
        if (!find) {
            return next(new Error(`${500}:${`Cannot find user`}`));
        }
        if (user.role != "admin") {
            return next(new Error(`${500}:${`Permisson dined `}`));
        }
        const fullUser = (yield (0, auth_1.getAllUser)()).filter((item) => {
            delete item.password;
            delete item.code;
            if (item.role != "admin")
                return item;
        });
        return res.send({
            status: true,
            data: fullUser,
        });
    }
    catch (e) {
        return next(new Error(`${500}:${e.message}`));
    }
});
exports.getFullUser = getFullUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const find = yield (0, auth_1.findUserByUserID)(user.userID);
        delete find.password;
        delete find.code;
        return res.send({
            status: true,
            data: find,
        });
    }
    catch (e) {
        return next(new Error(`${500}:${e.message}`));
    }
});
exports.getUser = getUser;
