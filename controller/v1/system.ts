/** @format */

import { Response, Request, NextFunction } from "express";
import { validate } from "../../common";
import { Food, GroupFood, Hall, Table } from "../../interface/system";
import { findUserByUserID } from "../../service/auth";
import {
	changeFood,
	changeGroupFood,
	changeHall,
	changeTable,
	deleteFood,
	deleteGroup,
	deleteHall,
	deleteTable,
	findFood,
	findGroup,
	findHall,
	findTable,
	getAllFood,
	getAllGroupFood,
	getAllHall,
	getAllTable,
	insertFood,
	insertGroupFood,
	insertHall,
	insertTable,
	getFullTableByHallID,
	getFullGroupAndFood,
} from "../../service/system";
import {
	addFoodValid,
	addGroupFoodValid,
	addHallValid,
	addTableValid,
	deleteFoodValid,
	getFullTableOfHallValid,
	updateFoodValid,
	updateGroupFoodValid,
	updateHallValid,
	updateTableValid,
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

const getMenu = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		var find = await (
			await getAllFood()
		).map((item: any) => {
			delete item._id;
			return item;
		});
		return res.send({
			status: true,
			data: find,
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

const getFullGroupFood = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const find = await getFullGroupAndFood();
		return res.send({
			status: true,
			data: find,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const addTable = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, addTableValid);
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

		const hall = await findHall(validBody.hallID);
		if (!hall) {
			return next(new Error(`${500}:${"Cannot find hall"}`));
		}

		const allTable = await getAllTable();

		const table: Table = {
			hallID: validBody.hallID,
			isReady: true,
			listFood: [],
			name: validBody.name,
			sizeOnTable: validBody.sizeOnTable,
			id: allTable.length + 1,
			userIDUse: null,
			userNameUse: null,
		};

		const add = await insertTable(table);

		if (!add) {
			return next(new Error(`${500}:${"Add group food fail cannot update db"}`));
		}

		return res.send({
			status: true,
			data: table,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const removeTable = async (req: Request | any, res: Response, next: NextFunction) => {
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

		const findT = await findTable(validBody.id);

		if (!findT) {
			return next(new Error(`${500}:${"Cannot find table"}`));
		}

		const deleteT = await deleteTable(validBody.id);

		if (!deleteT) {
			return next(new Error(`${500}:${"Delete table fail cannot update db"}`));
		}

		return res.send({
			status: true,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const addHall = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, addHallValid);
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

		const allHall = await getAllHall();

		const hall: Hall = {
			id: allHall.length + 1,
			isReady: true,
			name: validBody.name,
			size: validBody.size,
			type: validBody.type,
			userIDUse: null,
			userNameUse: null,
		};

		const add = await insertHall(hall);

		if (!add) {
			return next(new Error(`${500}:${"Add hall fail cannot update db"}`));
		}

		return res.send({
			status: true,
			data: hall,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const removeHall = async (req: Request | any, res: Response, next: NextFunction) => {
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

		const findH = await findHall(validBody.id);

		if (!findH) {
			return next(new Error(`${500}:${"Cannot find hall"}`));
		}

		const deleteH = await deleteHall(validBody.id);

		if (!deleteH) {
			return next(new Error(`${500}:${"Delete hall fail cannot update db"}`));
		}

		return res.send({
			status: true,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const updateTable = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, updateTableValid);
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

		const findT = await findTable(validBody.id);

		if (!findT) {
			return next(new Error(`${500}:${"Cannot find table"}`));
		}

		const table: Table = {
			hallID: findT.hallID,
			isReady: findT.isReady,
			listFood: findT.listFood,
			name: validBody.name,
			sizeOnTable: validBody.sizeOnTable,
			id: findT.id,
			userIDUse: findT.userIDUse,
			userNameUse: findT.userNameUse,
		};

		const update = await changeTable(table.id, table);

		if (!update) {
			return next(new Error(`${500}:${"Update group food fail cannot update db"}`));
		}

		return res.send({
			status: true,
			data: table,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const updateHall = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, updateHallValid);
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

		const findH = await findHall(validBody.id);

		if (!findH) {
			return next(new Error(`${500}:${"Cannot find table"}`));
		}

		const hall: Hall = {
			id: validBody.id,
			isReady: findH.isReady,
			name: validBody.name,
			size: validBody.size,
			type: validBody.type,
			userIDUse: findH.userIDUse,
			userNameUse: findH.userNameUse,
		};

		const update = await changeHall(hall.id, hall);

		if (!update) {
			return next(new Error(`${500}:${"Update group food fail cannot update db"}`));
		}

		return res.send({
			status: true,
			data: hall,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const getFullHall = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const hall = await getAllHall();
		return res.send({
			status: true,
			data: hall,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const getFullTableOfHall = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, getFullTableOfHallValid);

		if (!validBody) {
			return next(new Error(`${500}:${"Validate data fail"}`));
		}

		const findH = await findHall(validBody.id);

		if (!findH) {
			return next(new Error(`${500}:${"Cannot find table"}`));
		}

		const find = await getFullTableByHallID(validBody.id);

		return res.send({
			status: true,
			data: find,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

export {
	addFood,
	updateFood,
	removeFood,
	addGroupFood,
	updateGroupFood,
	removeGroupFood,
	addTable,
	removeTable,
	addHall,
	removeHall,
	updateTable,
	updateHall,
	getMenu,
	getFullHall,
	getFullTableOfHall,
	getFullGroupFood,
};
