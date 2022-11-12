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
exports.updateOne = exports.getMany = exports.insertMany = void 0;
const mongodb_1 = __importDefault(require("../../utils/mongodb"));
const insertMany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var collection = req.headers["collection"];
    var body = req.body;
    if (!collection)
        return next(new Error("400:Collection is required !"));
    if (!Array.isArray(body))
        return next(new Error("400:Body should be is array !"));
    try {
        yield mongodb_1.default.collection(collection).insertMany(body);
        return res.status(200).json({ status: true });
    }
    catch (err) {
        return next(new Error(`400:${err.message}`));
    }
});
exports.insertMany = insertMany;
const getMany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var collection = req.headers["collection"];
    var query = req.body.query;
    if (!collection)
        return next(new Error("400:Collection is required !"));
    if (typeof query !== "object")
        return next(new Error("400:Body should be is object !"));
    try {
        const data = yield mongodb_1.default.collection(collection).find(query).toArray();
        return res.status(200).json({ status: true, data: data });
    }
    catch (err) {
        return next(new Error(`400:${err.message}`));
    }
});
exports.getMany = getMany;
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var collection = req.headers["collection"];
    var query = req.body.query;
    var data = req.body.data;
    var upsert = req.body.upsert;
    if (!collection)
        return next(new Error("400:Collection is required !"));
    if (typeof query !== "object")
        return next(new Error("400:Body should be is object !"));
    try {
        yield mongodb_1.default.collection(collection).updateOne(query, data, {
            upsert: upsert || false,
        });
        return res.status(200).json({ status: true });
    }
    catch (err) {
        return next(new Error(`400:${err.message}`));
    }
});
exports.updateOne = updateOne;
