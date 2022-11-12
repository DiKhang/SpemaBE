import { Response, Request, NextFunction } from "express";
import db from "../../utils/mongodb";

const insertMany = async (req: Request, res: Response, next: NextFunction) => {
  var collection: any = req.headers["collection"];
  var body = req.body;

  if (!collection) return next(new Error("400:Collection is required !"));

  if (!Array.isArray(body))
    return next(new Error("400:Body should be is array !"));

  try {
    await db.collection(collection).insertMany(body);

    return res.status(200).json({ status: true });
  } catch (err: any) {
    return next(new Error(`400:${err.message}`));
  }
};

const getMany = async (req: Request, res: Response, next: NextFunction) => {
  var collection: any = req.headers["collection"];
  var query = req.body.query;

  if (!collection) return next(new Error("400:Collection is required !"));

  if (typeof query !== "object")
    return next(new Error("400:Body should be is object !"));

  try {
    const data = await db.collection(collection).find(query).toArray();

    return res.status(200).json({ status: true, data: data });
  } catch (err: any) {
    return next(new Error(`400:${err.message}`));
  }
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
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

export { insertMany, getMany, updateOne };
