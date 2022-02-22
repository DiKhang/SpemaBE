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
exports.handleUploadFile = void 0;
const common_1 = require("../common");
const handleUploadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            return next(new Error(`${404}:${"Please upload file !"}`));
        }
        //upload file on firebase storange
        const upload = yield (0, common_1.uploadFile)(req.file, `file/${req.user.username}/`);
        if (!upload) {
            return next(new Error(`${400}:${"Upload file fail!"}`));
        }
        return res.send({
            status: true,
            data: upload,
        });
    }
    catch (e) {
        return next(new Error(`${400}:${e.message}`));
    }
});
exports.handleUploadFile = handleUploadFile;
