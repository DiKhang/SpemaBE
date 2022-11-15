import { Response, Request, NextFunction } from "express";
import db from "../../utils/mongodb";
import { findUser, findUserByUserID } from "../../service/auth";

const insertMany = async (req: any, res: Response, next: NextFunction) => {
  const userID = req.user.userID;

  if (userID != req.body.userID) return next(new Error("400:Access denied !"));

  var collection: any = req.headers["collection"];
  var body = req.body;

  if (!collection) return next(new Error("400:Collection is required !"));

  if (!Array.isArray(body.data))
    return next(new Error("400:Body should be is array !"));

  try {
    await db.collection(collection).insertMany(body.data);

    return res.status(200).json({ status: true });
  } catch (err: any) {
    return next(new Error(`400:${err.message}`));
  }
};

const getOne = async (req: any, res: Response, next: NextFunction) => {
  const userID = req.user.userID;
  if (userID != req.body.userID) return next(new Error("400:Access denied !"));

  var collection: any = req.headers["collection"];
  var query = req.body.query;

  if (collection == "User" && Object.keys(query).length == 0)
    return next(new Error("400:Access denied!"));

  if (!collection) return next(new Error("400:Collection is required !"));

  if (typeof query !== "object")
    return next(new Error("400:Body should be is object !"));

  try {
    const data = await db.collection(collection).findOne(query);

    return res.status(200).json({ status: true, data: data });
  } catch (err: any) {
    return next(new Error(`400:${err.message}`));
  }
};

const updateOne = async (req: any, res: Response, next: NextFunction) => {
  const userID = req.user.userID;
  if (userID != req.body.userID) return next(new Error("400:Access denied !"));

  var collection: any = req.headers["collection"];
  var query = req.body.query;
  var data = req.body.data;
  var upsert = req.body.upsert;

  if (!collection) return next(new Error("400:Collection is required !"));

  if (typeof query !== "object")
    return next(new Error("400:Body should be is object !"));

  try {
    await db.collection(collection).updateOne(query, data, {
      upsert: upsert || false,
    });

    return res.status(200).json({ status: true });
  } catch (err: any) {
    return next(new Error(`400:${err.message}`));
  }
};

export { insertMany, getOne, updateOne };
