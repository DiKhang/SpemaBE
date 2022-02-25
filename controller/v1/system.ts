/** @format */

import { Response, Request, NextFunction } from "express";
import { validate } from "../../common";
import { Food, GroupFood } from "../../interface/system";
import { findUserByUserID } from "../../service/auth";
import {
	changeFood,
	changeGroupFood,
	deleteFood,
	deleteGroup,
	findFood,
	findGroup,
	getAllFood,
	getAllGroupFood,
	insertFood,
	insertGroupFood,
} from "../../service/system";
import {
	addFoodValid,
	addGroupFoodValid,
	deleteFoodValid,
	updateFoodValid,
	updateGroupFoodValid,
} from "../../validate/system";

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
			decription: validBody.decription,
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
			decription: validBody.decription,
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

const addGroupFood = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, addGroupFoodValid);
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

		const allGroup = await getAllGroupFood();

		var price = 0;

		for (var i = 0; i < validBody.listFood.length; i++) {
			var food = await findFood(validBody.listFood[i]);
			if (!food) {
				return next(new Error(`${500}:${`Cannot find ID Food ${validBody.listFood[i]}`}`));
			}
			price += food.price;
		}

		const group: GroupFood = {
			id: allGroup.length + 1,
			name: validBody.name,
			price: price,
			listFood: validBody.listFood,
			decription: validBody.decription,
		};

		const add = await insertGroupFood(group);

		if (!add) {
			return next(new Error(`${500}:${"Add group food fail cannot update db"}`));
		}

		return res.send({
			status: true,
			data: group,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const updateGroupFood = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, updateGroupFoodValid);
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

		const findG = await findGroup(validBody.id);

		if (!findG) {
			return next(new Error(`${500}:${"Cannot find Group Food"}`));
		}

		var price = 0;

		for (var i = 0; i < validBody.listFood.length; i++) {
			var food = await findFood(validBody.listFood[i]);
			if (!food) {
				return next(new Error(`${500}:${`Cannot find ID Food ${validBody.listFood[i]}`}`));
			}
			price += food.price;
		}

		const group: GroupFood = {
			id: validBody.id,
			name: validBody.name,
			price: price,
			decription: validBody.decription,
			listFood: validBody.listFood,
		};

		const update = await changeGroupFood(group.id, group);

		if (!update) {
			return next(new Error(`${500}:${"Update group food fail cannot update db"}`));
		}

		return res.send({
			status: true,
			data: group,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const removeGroupFood = async (req: Request | any, res: Response, next: NextFunction) => {
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

		const findG = await findGroup(validBody.id);

		if (!findG) {
			return next(new Error(`${500}:${"Cannot find Group Food"}`));
		}

		const deleteF = await deleteGroup(validBody.id);

		if (!deleteF) {
			return next(new Error(`${500}:${"Delete group food fail cannot update db"}`));
		}

		return res.send({
			status: true,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

export { addFood, updateFood, removeFood, addGroupFood, updateGroupFood, removeGroupFood };
