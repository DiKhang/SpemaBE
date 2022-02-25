/** @format */

import { Response, Request, NextFunction } from "express";
import { validate } from "../../common";
import { Food } from "../../interface/system";
import { findUserByUserID } from "../../service/auth";
import { changeFood, deleteFood, findFood, getAllFood, insertFood } from "../../service/system";
import { addFoodValid, deleteFoodValid, updateFoodValid } from "../../validate/system";

const addFood = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, addFoodValid);
		const user = req.user;

		if (!validBody) {
			return next(new Error(`${500}:${"Validate data fail"}`));
		}

		const find = await findUserByUserID(user.userID);

		if (!find || !find.active) {
			return next(new Error(`${500}:${"Cannot find user"}`));
		}

		if (find.role != "admin") {
			return next(new Error(`${500}:${"Permisson denied"}`));
		}

		const allFood = await getAllFood();

		const food: Food = {
			category: validBody.category,
			id: allFood.length + 1,
			name: validBody.name,
			price: validBody.price,
			img: validBody.img,
		};

		const add = await insertFood(food);

		if (!add) {
			return next(new Error(`${500}:${"Add food fail cannot update db"}`));
		}

		return res.send({
			status: true,
			data: food,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const updateFood = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, updateFoodValid);
		const user = req.user;

		if (!validBody) {
			return next(new Error(`${500}:${"Validate data fail"}`));
		}

		const find = await findUserByUserID(user.userID);

		if (!find || !find.active) {
			return next(new Error(`${500}:${"Cannot find user"}`));
		}

		if (find.role != "admin") {
			return next(new Error(`${500}:${"Permisson denied"}`));
		}

		const findF = await findFood(validBody.id);

		if (!findF) {
			return next(new Error(`${500}:${"Cannot find food"}`));
		}

		const food: Food = {
			category: validBody.category,
			id: validBody.id,
			name: validBody.name,
			price: validBody.price,
			img: validBody.img,
		};

		const update = await changeFood(food.id, food);

		if (!update) {
			return next(new Error(`${500}:${"Update food fail cannot update db"}`));
		}

		return res.send({
			status: true,
			data: food,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const removeFood = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, deleteFoodValid);
		const user = req.user;

		if (!validBody) {
			return next(new Error(`${500}:${"Validate data fail"}`));
		}

		const find = await findUserByUserID(user.userID);

		if (!find || !find.active) {
			return next(new Error(`${500}:${"Cannot find user"}`));
		}

		if (find.role != "admin") {
			return next(new Error(`${500}:${"Permisson denied"}`));
		}

		const findF = await findFood(validBody.id);

		if (!findF) {
			return next(new Error(`${500}:${"Cannot find food"}`));
		}

		const deleteF = await deleteFood(validBody.id);

		if (!deleteF) {
			return next(new Error(`${500}:${"Delete food fail cannot update db"}`));
		}

		return res.send({
			status: true,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

export { addFood, updateFood, removeFood };
