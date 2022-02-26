/** @format */

import { Response, Request, NextFunction } from "express";
import { getISOStringDate, sendHistory, sendNotifi, validate } from "../../common";
import { Food, GroupFood, Hall, RequestOrder, Table } from "../../interface/system";
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
	insertRequestOrder,
	findAllRequestOrder,
	findRequestOrder,
	changeRequestOrder,
	changeStatusRequestOrder,
	removeRequestOrderOfHallandTable,
	addRequestOrderOfHallandTable,
	changeStatusPaidRequestOrder,
	findRequestOrderFullObject,
	findFullRequestOrderFullObject,
	findFullRequestOrderFullObjectByUserID,
	findFullRequestOrderFullObjectByHallID,
} from "../../service/system";
import {
	addFoodValid,
	addGroupFoodValid,
	addHallValid,
	addRequestOrderValid,
	addTableValid,
	deleteFoodValid,
	getFullTableOfHallValid,
	updateFoodValid,
	updateGroupFoodValid,
	updateHallValid,
	updateRequestOrderValid,
	updateStatusOrderValid,
	updateStatusPaidOrderValid,
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

		await sendHistory(`${user.name} vừa thêm một món ăn`, user.userID, food);

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

		await sendHistory(`${user.name} vừa chỉnh sửa một món ăn`, user.userIDAction, food);

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

		await sendHistory(`${user.name} vừa xoá một món ăn`, user.userID, findF);

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

		await sendHistory(`${user.name} vừa thêm một nhóm món ăn`, user.userID, group);

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

		await sendHistory(`${user.name} vừa chỉnh sửa một nhóm món ăn`, user.userID, group);

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

		await sendHistory(`${user.name} vừa xoá một nhóm món ăn`, user.userID, findG);

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
			requestOrderID: null,
		};

		const add = await insertTable(table);

		if (!add) {
			return next(new Error(`${500}:${"Add group food fail cannot update db"}`));
		}

		await sendHistory(`${user.name} vừa thêm một bàn ăn`, user.userID, table);

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

		await sendHistory(`${user.name} vừa xoá một bàn ăn`, user.userID, findT);

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
			requestOrderID: null,
		};

		const add = await insertHall(hall);

		if (!add) {
			return next(new Error(`${500}:${"Add hall fail cannot update db"}`));
		}

		await sendHistory(`${user.name} vừa thêm một sảnh ăn`, user.userID, hall);

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

		await sendHistory(`${user.name} vừa xoá một sảnh ăn`, user.userID, findH);

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
			requestOrderID: findT.requestOrderID,
		};

		const update = await changeTable(table.id, table);

		if (!update) {
			return next(new Error(`${500}:${"Update group food fail cannot update db"}`));
		}

		await sendHistory(`${user.name} vừa chỉnh sửa một bàn ăn`, user.userID, table);

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
			requestOrderID: findH.requestOrderID,
		};

		const update = await changeHall(hall.id, hall);

		if (!update) {
			return next(new Error(`${500}:${"Update group food fail cannot update db"}`));
		}

		await sendHistory(`${user.name} vừa chỉnh sửa một sảnh ăn`, user.userID, hall);

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

const addRequestOrder = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, addRequestOrderValid);
		const user = req.user;

		if (!validBody) {
			return next(new Error(`${500}:${"Validate data fail"}`));
		}

		const find = await findUserByUserID(user.userID);

		if (!find || !find.active) {
			return next(new Error(`${500}:${"Cannot find user"}`));
		}

		const allRequest = await findAllRequestOrder();

		const request: RequestOrder = {
			hallID: validBody.hallID,
			isPaid: "unpaid",
			listFood: validBody.listFood,
			note: validBody.note,
			status: "pending",
			tableID: validBody.tableID,
			time: getISOStringDate(new Date()),
			timeStart: validBody.timeStart,
			totalMoney: validBody.totalMoney,
			type: validBody.type,
			userID: user.userID,
			userName: user.name,
			userPhone: user.phone,
			id: allRequest.length + 1,
		};

		const add = await insertRequestOrder(request);

		if (!add) {
			return next(new Error(`${500}:${"Add request order fail cannot update db"}`));
		}

		await sendHistory(`${user.name} gửi một yêu cầu đặt tiệc`, user.userID, request);

		await sendNotifi(`Bạn vừa gửi yêu cầu đặt tiệc thành công .`, request.userID, request);

		return res.send({
			status: true,
			data: request,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const updateRequestOrder = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, updateRequestOrderValid);
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

		const findRequest = await findRequestOrder(validBody.id);

		if (!findRequest) {
			return next(new Error(`${500}:${"Cannot find request"}`));
		}

		if (findRequest.status != "pending" && findRequest.status != "denied") {
			return next(new Error(`${500}:${"Cannot update request after accept "}`));
		}

		const request: RequestOrder = {
			hallID: validBody.hallID,
			totalMoney: validBody.totalMoney,
			listFood: validBody.listFood,
			timeStart: validBody.timeStart,
			note: validBody.note,
			type: validBody.type,
			tableID: validBody.tableID,
			time: findRequest.time,
			id: findRequest.id,
			isPaid: findRequest.isPaid,
			status: findRequest.status,
			userID: findRequest.userID,
			userName: findRequest.userName,
			userPhone: findRequest.userPhone,
		};

		const update = await changeRequestOrder(validBody.id, request);
		if (!update) {
			return next(new Error(`${500}:${"Update request order fail cannot update db"}`));
		}

		await sendHistory(
			`${user.name} vừa chỉnh sửa một yêu cầu đặt tiệc của khách hàng tên ${request.userName}`,
			user.userID,
			request,
		);

		await sendNotifi(
			`Admin ${user.name} đã chỉnh sửa một yêu cầu đặt tiệc của bạn ID tiệc:${request.id}.`,
			request.userID,
			request,
		);

		return res.send({
			status: true,
			data: request,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const updateStatusRequestOrder = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, updateStatusOrderValid);
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

		const request = await findRequestOrder(validBody.id);

		if (!request) {
			return next(new Error(`${500}:${"Cannot find request order"}`));
		}

		if (request.status == "end") {
			return next(new Error(`${500}:${"Cannot update request status is end"}`));
		}

		switch (validBody.status) {
			case "pending": {
				var handle = await removeRequestOrderOfHallandTable(validBody.id);
				if (!handle) {
					return next(new Error(`${500}:${"Update status request order fail cannot update db"}`));
				}
				break;
			}
			case "accept": {
				break;
			}
			case "denied": {
				var handle = await removeRequestOrderOfHallandTable(validBody.id);
				if (!handle) {
					return next(new Error(`${500}:${"Update status request order fail cannot update db"}`));
				}
				break;
			}
			case "starting": {
				if (request.isPaid != "paid") {
					return next(
						new Error(`${500}:${"Cannot update status starting for party not full paid"}`),
					);
				}
				var handle = await addRequestOrderOfHallandTable(
					request.hallID,
					validBody.id,
					request.listFood,
					request.tableID,
				);
				if (!handle) {
					return next(new Error(`${500}:${"Update status request order fail cannot update db"}`));
				}
				break;
			}
			case "end": {
				var handle = await removeRequestOrderOfHallandTable(validBody.id);
				if (!handle) {
					return next(new Error(`${500}:${"Update status request order fail cannot update db"}`));
				}
				break;
			}
			default: {
				return next(new Error(`${500}:${`Status unknown`}`));
			}
		}

		var update = await changeStatusRequestOrder(validBody.id, validBody.status);

		if (!update) {
			return next(new Error(`${500}:${"Update status request order fail cannot update db"}`));
		}

		await sendHistory(
			`${user.name} vừa chỉnh sửa trạng thái một yêu cầu đặt tiệc của khách hàng tên ${request.userName} thành ${validBody.status}`,
			user.userID,
			request,
		);

		await sendNotifi(
			`Admin ${user.name} đã update trạng thái yêu cầu đặt tiệc của bạn thành ${validBody.status} ID tiệc:${request.id}.`,
			request.userID,
			request,
		);

		return res.send({
			status: true,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const updateStatusPaid = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const body = req.body;
		const validBody = validate(body, updateStatusPaidOrderValid);
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

		const request = await findRequestOrder(validBody.id);

		if (!request) {
			return next(new Error(`${500}:${"Cannot find request order"}`));
		}

		if (request.status == "end") {
			return next(new Error(`${500}:${"Cannot update request status is end"}`));
		}

		switch (validBody.isPaid) {
			case "unpaid": {
				break;
			}
			case "deposited": {
				break;
			}
			case "paid": {
				break;
			}
			default: {
				return next(new Error(`${500}:${`Status unknown`}`));
			}
		}

		var update = await changeStatusPaidRequestOrder(validBody.id, validBody.isPaid);

		if (!update) {
			return next(new Error(`${500}:${"Update status request order fail cannot update db"}`));
		}

		await sendHistory(
			`${user.name} vừa chỉnh sửa trạng thái thanh toán một yêu cầu đặt tiệc của khách hàng tên ${request.userName} thành ${validBody.status}`,
			user.userID,
			request,
		);

		await sendNotifi(
			`Admin ${user.name} đã update trạng thái thanh toán cho yêu cầu đặt tiệc của bạn thành ${validBody.isPaid} ID tiệc:${request.id}. `,
			request.userID,
			request,
		);

		return res.send({
			status: true,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const getRequestOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		var { id } = req.query;

		const request = await findRequestOrderFullObject(Number(id));

		for (var i = 0; i < request.length; i++) {
			for (var j = 0; j < request[i].tableID.length; j++) {
				for (var k = 0; k < request[i].tableID[j].listFood.length; k++) {
					request[i].tableID[j].listFood[k] = await findFood(request[i].tableID[j].listFood[k]);
				}
			}
		}

		return res.send({
			status: true,
			data: request,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const getFullRequestOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const request = await findFullRequestOrderFullObject();

		for (var i = 0; i < request.length; i++) {
			for (var j = 0; j < request[i].tableID.length; j++) {
				for (var k = 0; k < request[i].tableID[j].listFood.length; k++) {
					request[i].tableID[j].listFood[k] = await findFood(request[i].tableID[j].listFood[k]);
				}
			}
		}

		return res.send({
			status: true,
			data: request,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const getFullRequestOrderByUserID = async (
	req: Request | any,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;
		const request = await findFullRequestOrderFullObjectByUserID(user.userID);

		for (var i = 0; i < request.length; i++) {
			for (var j = 0; j < request[i].tableID.length; j++) {
				for (var k = 0; k < request[i].tableID[j].listFood.length; k++) {
					request[i].tableID[j].listFood[k] = await findFood(request[i].tableID[j].listFood[k]);
				}
			}
		}

		return res.send({
			status: true,
			data: request,
		});
	} catch (e: any) {
		return next(new Error(`${500}:${e.message}`));
	}
};

const getFullRequestOrderByHallID = async (
	req: Request | any,
	res: Response,
	next: NextFunction,
) => {
	try {
		var { hallID } = req.query;

		const request = await findFullRequestOrderFullObjectByHallID(Number(hallID));

		for (var i = 0; i < request.length; i++) {
			for (var j = 0; j < request[i].tableID.length; j++) {
				for (var k = 0; k < request[i].tableID[j].listFood.length; k++) {
					request[i].tableID[j].listFood[k] = await findFood(request[i].tableID[j].listFood[k]);
				}
			}
		}

		return res.send({
			status: true,
			data: request,
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
	addRequestOrder,
	updateRequestOrder,
	updateStatusRequestOrder,
	updateStatusPaid,
	getRequestOrder,
	getFullRequestOrder,
	getFullRequestOrderByUserID,
	getFullRequestOrderByHallID,
};
