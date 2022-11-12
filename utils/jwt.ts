/** @format */

import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export const signToken = (payLoad: object, refresh?: boolean) => {
  var keyPath = path.join(process.cwd(), "key", "private.key");
  var privateKey = fs.readFileSync(keyPath).toString();
  var token = jwt.sign(
    {
      ...payLoad,
      exp: refresh
        ? Math.floor(Date.now() / 1000) + 60 * 60 * 48 // 2 days
        : Math.floor(Date.now() / 1000) + 60 * 60 * 24, //1 ngay
    }, //token exp 24h
    privateKey,
    { algorithm: "RS256" }
  );
  return token;
};

export const verifyToken = (token: string) => {
  var keyPath = path.join(process.cwd(), "key", "public.key");
  var publicKey = fs.readFileSync(keyPath).toString();
  try {
    var decode = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    return decode;
  } catch (e) {
    return false;
  }
};
