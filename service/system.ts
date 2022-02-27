/** @format */

import { getISOStringDate } from "../common";
import { Food, GroupFood, Hall, History, Notifi, RequestOrder, Table } from "../interface/system";
import client from "../utils/mongodb";

const getAllFood = async () => {
	const find = await client.collection("Food").find({}).toArray();
	return find;
};

const findFood = async (foodID: number) => {
	const find = await client.collection("Food").findOne({
		id: foodID,
	});
	return find;
};

const insertFood = async (food: Food) => {
	try {
		const add = await client.collection("Food").insertOne(food);
		return add.insertedId;
	} catch (e: any) {
		return false;
	}
};

const changeFood = async (foodID: number, food: Food | any) => {
	delete food.id;
	try {
		const update = await client.collection("Food").updateOne(
			{
				id: foodID,
			},
			{
				$set: {
					...food,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		return false;
	}
};

const deleteFood = async (foodID: number) => {
	try {
		const update = await client.collection("Food").deleteOne({
			id: foodID,
		});
		return update.deletedCount;
	} catch (e: any) {
		return false;
	}
};

const getAllGroupFood = async () => {
	const find = await client.collection("GroupFood").find({}).toArray();
	return find;
};

const getFullGroupAndFood = async () => {
	const find = await client
		.collection("Group")
		.aggregate([
			{
				$unwind: {
					path: "$listFood",
				},
			},
			{
				$lookup: {
					from: "Food",
					localField: "listFood",
					foreignField: "id",
					as: "listFood",
				},
			},
			{
				$group: {
					_id: "$id",
					id: {
						$first: "$id",
					},
					listFood: {
						$push: { $first: "$listFood" },
					},
					name: {
						$first: "$name",
					},
					price: {
						$first: "$price",
					},
					decription: {
						$first: "$decription",
					},
				},
			},
		])
		.toArray();

	return find;
};

const insertGroupFood = async (group: GroupFood) => {
	try {
		const add = await client.collection("Group").insertOne(group);
		return add.insertedId;
	} catch (e: any) {
		return false;
	}
};

const findGroup = async (groupID: number) => {
	const find = await client.collection("Group").findOne({
		id: groupID,
	});
	return find;
};

const changeGroupFood = async (groupID: number, group: GroupFood | any) => {
	delete group.id;
	try {
		const update = await client.collection("Group").updateOne(
			{
				id: groupID,
			},
			{
				$set: {
					...group,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		return false;
	}
};

const deleteGroup = async (groupID: number) => {
	try {
		const update = await client.collection("Group").deleteOne({
			id: groupID,
		});
		return update.deletedCount;
	} catch (e: any) {
		return false;
	}
};

const getAllTable = async () => {
	const find = await client.collection("Table").find({}).toArray();
	return find;
};

const findTable = async (tableID: number) => {
	const find = await client.collection("Table").findOne({
		id: tableID,
	});
	return find;
};

const insertTable = async (table: Table) => {
	try {
		const add = await client.collection("Table").insertOne(table);
		return add.insertedId;
	} catch (e: any) {
		return false;
	}
};

const deleteTable = async (tableID: number) => {
	try {
		const update = await client.collection("Table").deleteOne({
			id: tableID,
		});
		return update.deletedCount;
	} catch (e: any) {
		return false;
	}
};

const findHall = async (hallID: number) => {
	const find = await client.collection("Hall").findOne({
		id: hallID,
	});
	return find;
};

const getAllHall = async () => {
	const find = await client.collection("Hall").find({}).toArray();
	return find;
};

const insertHall = async (hall: Hall) => {
	try {
		const add = await client.collection("Hall").insertOne(hall);
		return add.insertedId;
	} catch (e: any) {
		return false;
	}
};

const deleteHall = async (hallID: number) => {
	try {
		const update = await client.collection("Hall").deleteOne({
			id: hallID,
		});
		return update.deletedCount;
	} catch (e: any) {
		return false;
	}
};

const changeHall = async (hallID: number, hall: Hall | any) => {
	delete hall.id;
	try {
		const update = await client.collection("Hall").updateOne(
			{
				id: hallID,
			},
			{
				$set: {
					...hall,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		return false;
	}
};

const changeTable = async (tableID: number, table: Table | any) => {
	delete table.id;
	try {
		const update = await client.collection("Table").updateOne(
			{
				id: tableID,
			},
			{
				$set: {
					...table,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		return false;
	}
};

const getFullTableByHallID = async (hallID: number) => {
	const find = await client
		.collection("Table")
		.find({
			hallID: hallID,
		})
		.toArray();
	return find;
};

const insertRequestOrder = async (request: RequestOrder) => {
	try {
		const add = await client.collection("RequestOrder").insertOne(request);
		return add.insertedId;
	} catch (e: any) {
		return false;
	}
};

const findAllRequestOrder = async () => {
	const find = await client.collection("RequestOrder").find({}).toArray();
	return find;
};

const findRequestOrder = async (requestID: number) => {
	const find = await client.collection("RequestOrder").findOne({
		id: requestID,
	});
	return find;
};

const changeRequestOrder = async (requestID: number, request: RequestOrder | any) => {
	delete request.id;
	try {
		const update = await client.collection("RequestOrder").updateOne(
			{
				id: requestID,
			},
			{
				$set: {
					...request,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		return false;
	}
};

const changeStatusRequestOrder = async (requestID: number, status: string) => {
	try {
		const update = await client.collection("RequestOrder").updateOne(
			{
				id: requestID,
			},
			{
				$set: {
					status: status,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		return false;
	}
};

const removeRequestOrderOfHallandTable = async (requestID: number) => {
	try {
		var update: boolean = true;
		await client
			.collection("Hall")
			.updateOne(
				{
					requestOrderID: requestID,
				},
				{
					$set: {
						requestOrderID: null,
						isReady: false,
						userIDUse: null,
						userNameUse: null,
					},
				},
			)
			.catch((e) => {
				update = false;
			});

		if (!update) {
			return false;
		}

		await client
			.collection("Table")
			.updateMany(
				{
					requestOrderID: requestID,
				},
				{
					$set: {
						requestOrderID: null,
						listFood: [],
						isReady: true,
						userIDUse: null,
						userNameUse: null,
					},
				},
			)
			.catch((e) => {
				update = false;
			});

		if (!update) {
			return false;
		}

		return true;
	} catch (e: any) {
		return false;
	}
};

const addRequestOrderOfHallandTable = async (
	hallID: number,
	requestID: number,
	listFood: number[],
	tableID: number[],
	userIDUse: number,
	userNameUse: string,
) => {
	try {
		var update: boolean = true;
		await client
			.collection("Hall")
			.updateOne(
				{
					id: hallID,
				},
				{
					$set: {
						requestOrderID: requestID,
						isReady: false,
						userIDUse: userIDUse,
						userNameUse: userNameUse,
					},
				},
			)
			.catch((e) => {
				update = false;
			});

		if (!update) {
			return false;
		}

		await tableID.map(async (item) => {
			await client
				.collection("Table")
				.updateOne(
					{
						id: item,
					},
					{
						$set: {
							requestOrderID: requestID,
							listFood: listFood,
							isReady: false,
							userIDUse: userIDUse,
							userNameUse: userNameUse,
						},
					},
				)
				.catch(() => {
					update = false;
				});
		});

		if (!update) {
			return false;
		}

		return true;
	} catch (e: any) {
		return false;
	}
};

const changeStatusPaidRequestOrder = async (requestID: number, isPaid: string) => {
	try {
		const update = await client.collection("RequestOrder").updateOne(
			{
				id: requestID,
			},
			{
				$set: {
					isPaid: isPaid,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		return false;
	}
};

const addHistory = async (history: History) => {
	try {
		const add = await client.collection("History").insertOne(history);
		return add.insertedId;
	} catch (e: any) {
		return false;
	}
};

const addNotifi = async (notifi: Notifi) => {
	try {
		const add = await client.collection("Notifi").insertOne(notifi);
		return add.insertedId;
	} catch (e: any) {
		return false;
	}
};

const findRequestOrderFullObject = async (requestID: number) => {
	const find = await client
		.collection("RequestOrder")
		.aggregate([
			{
				$match: {
					id: requestID,
				},
			},
			{
				$unwind: {
					path: "$tableID",
				},
			},
			{
				$lookup: {
					from: "Table",
					localField: "tableID",
					foreignField: "id",
					as: "tableID",
				},
			},
			{
				$group: {
					_id: "$id",
					tableID: {
						$push: {
							$first: "$tableID",
						},
					},
					hallID: {
						$first: "$hallID",
					},
					isPaid: {
						$first: "$isPaid",
					},
					listFood: {
						$first: "$listFood",
					},
					note: {
						$first: "$note",
					},
					status: {
						$first: "$status",
					},
					time: {
						$first: "$time",
					},
					totalMoney: {
						$first: "$totalMoney",
					},
					type: {
						$first: "$type",
					},
					userID: {
						$first: "$userID",
					},
					userName: {
						$first: "$userName",
					},
					userPhone: {
						$first: "$userPhone",
					},
					id: {
						$first: "$id",
					},
					timeStart: {
						$first: "$timeStart",
					},
				},
			},
			{
				$unwind: {
					path: "$listFood",
				},
			},
			{
				$lookup: {
					from: "Food",
					localField: "listFood",
					foreignField: "id",
					as: "listFood",
				},
			},
			{
				$group: {
					_id: "$id",
					tableID: {
						$first: "$tableID",
					},
					hallID: {
						$first: "$hallID",
					},
					isPaid: {
						$first: "$isPaid",
					},
					listFood: {
						$push: {
							$first: "$listFood",
						},
					},
					note: {
						$first: "$note",
					},
					status: {
						$first: "$status",
					},
					time: {
						$first: "$time",
					},
					totalMoney: {
						$first: "$totalMoney",
					},
					type: {
						$first: "$type",
					},
					userID: {
						$first: "$userID",
					},
					userName: {
						$first: "$userName",
					},
					userPhone: {
						$first: "$userPhone",
					},
					id: {
						$first: "$id",
					},
					timeStart: {
						$first: "$timeStart",
					},
				},
			},
		])
		.toArray();
	return find;
};

const findFullRequestOrderFullObject = async () => {
	const find = await client
		.collection("RequestOrder")
		.aggregate([
			{
				$unwind: {
					path: "$tableID",
				},
			},
			{
				$lookup: {
					from: "Table",
					localField: "tableID",
					foreignField: "id",
					as: "tableID",
				},
			},
			{
				$group: {
					_id: "$id",
					tableID: {
						$push: {
							$first: "$tableID",
						},
					},
					hallID: {
						$first: "$hallID",
					},
					isPaid: {
						$first: "$isPaid",
					},
					listFood: {
						$first: "$listFood",
					},
					note: {
						$first: "$note",
					},
					status: {
						$first: "$status",
					},
					time: {
						$first: "$time",
					},
					totalMoney: {
						$first: "$totalMoney",
					},
					type: {
						$first: "$type",
					},
					userID: {
						$first: "$userID",
					},
					userName: {
						$first: "$userName",
					},
					userPhone: {
						$first: "$userPhone",
					},
					id: {
						$first: "$id",
					},
					timeStart: {
						$first: "$timeStart",
					},
				},
			},
			{
				$unwind: {
					path: "$listFood",
				},
			},
			{
				$lookup: {
					from: "Food",
					localField: "listFood",
					foreignField: "id",
					as: "listFood",
				},
			},
			{
				$group: {
					_id: "$id",
					tableID: {
						$first: "$tableID",
					},
					hallID: {
						$first: "$hallID",
					},
					isPaid: {
						$first: "$isPaid",
					},
					listFood: {
						$push: {
							$first: "$listFood",
						},
					},
					note: {
						$first: "$note",
					},
					status: {
						$first: "$status",
					},
					time: {
						$first: "$time",
					},
					totalMoney: {
						$first: "$totalMoney",
					},
					type: {
						$first: "$type",
					},
					userID: {
						$first: "$userID",
					},
					userName: {
						$first: "$userName",
					},
					userPhone: {
						$first: "$userPhone",
					},
					id: {
						$first: "$id",
					},
					timeStart: {
						$first: "$timeStart",
					},
				},
			},
		])
		.toArray();
	return find;
};

const findFullRequestOrderFullObjectByUserID = async (userID: number) => {
	const find = await client
		.collection("RequestOrder")
		.aggregate([
			{
				$match: {
					userID: userID,
				},
			},
			{
				$unwind: {
					path: "$tableID",
				},
			},
			{
				$lookup: {
					from: "Table",
					localField: "tableID",
					foreignField: "id",
					as: "tableID",
				},
			},
			{
				$group: {
					_id: "$id",
					tableID: {
						$push: {
							$first: "$tableID",
						},
					},
					hallID: {
						$first: "$hallID",
					},
					isPaid: {
						$first: "$isPaid",
					},
					listFood: {
						$first: "$listFood",
					},
					note: {
						$first: "$note",
					},
					status: {
						$first: "$status",
					},
					time: {
						$first: "$time",
					},
					totalMoney: {
						$first: "$totalMoney",
					},
					type: {
						$first: "$type",
					},
					userID: {
						$first: "$userID",
					},
					userName: {
						$first: "$userName",
					},
					userPhone: {
						$first: "$userPhone",
					},
					id: {
						$first: "$id",
					},
					timeStart: {
						$first: "$timeStart",
					},
				},
			},
			{
				$unwind: {
					path: "$listFood",
				},
			},
			{
				$lookup: {
					from: "Food",
					localField: "listFood",
					foreignField: "id",
					as: "listFood",
				},
			},
			{
				$group: {
					_id: "$id",
					tableID: {
						$first: "$tableID",
					},
					hallID: {
						$first: "$hallID",
					},
					isPaid: {
						$first: "$isPaid",
					},
					listFood: {
						$push: {
							$first: "$listFood",
						},
					},
					note: {
						$first: "$note",
					},
					status: {
						$first: "$status",
					},
					time: {
						$first: "$time",
					},
					totalMoney: {
						$first: "$totalMoney",
					},
					type: {
						$first: "$type",
					},
					userID: {
						$first: "$userID",
					},
					userName: {
						$first: "$userName",
					},
					userPhone: {
						$first: "$userPhone",
					},
					id: {
						$first: "$id",
					},
					timeStart: {
						$first: "$timeStart",
					},
				},
			},
		])
		.toArray();
	return find;
};

const findFullRequestOrderFullObjectByHallID = async (hallID: number) => {
	const find = await client
		.collection("RequestOrder")
		.aggregate([
			{
				$match: {
					hallID: hallID,
				},
			},
			{
				$unwind: {
					path: "$tableID",
				},
			},
			{
				$lookup: {
					from: "Table",
					localField: "tableID",
					foreignField: "id",
					as: "tableID",
				},
			},
			{
				$group: {
					_id: "$id",
					tableID: {
						$push: {
							$first: "$tableID",
						},
					},
					hallID: {
						$first: "$hallID",
					},
					isPaid: {
						$first: "$isPaid",
					},
					listFood: {
						$first: "$listFood",
					},
					note: {
						$first: "$note",
					},
					status: {
						$first: "$status",
					},
					time: {
						$first: "$time",
					},
					totalMoney: {
						$first: "$totalMoney",
					},
					type: {
						$first: "$type",
					},
					userID: {
						$first: "$userID",
					},
					userName: {
						$first: "$userName",
					},
					userPhone: {
						$first: "$userPhone",
					},
					id: {
						$first: "$id",
					},
					timeStart: {
						$first: "$timeStart",
					},
				},
			},
			{
				$unwind: {
					path: "$listFood",
				},
			},
			{
				$lookup: {
					from: "Food",
					localField: "listFood",
					foreignField: "id",
					as: "listFood",
				},
			},
			{
				$group: {
					_id: "$id",
					tableID: {
						$first: "$tableID",
					},
					hallID: {
						$first: "$hallID",
					},
					isPaid: {
						$first: "$isPaid",
					},
					listFood: {
						$push: {
							$first: "$listFood",
						},
					},
					note: {
						$first: "$note",
					},
					status: {
						$first: "$status",
					},
					time: {
						$first: "$time",
					},
					totalMoney: {
						$first: "$totalMoney",
					},
					type: {
						$first: "$type",
					},
					userID: {
						$first: "$userID",
					},
					userName: {
						$first: "$userName",
					},
					userPhone: {
						$first: "$userPhone",
					},
					id: {
						$first: "$id",
					},
					timeStart: {
						$first: "$timeStart",
					},
				},
			},
		])
		.toArray();
	return find;
};

export {
	getAllFood,
	insertFood,
	changeFood,
	findFood,
	deleteFood,
	insertGroupFood,
	getAllGroupFood,
	findGroup,
	changeGroupFood,
	deleteGroup,
	getAllTable,
	insertTable,
	findHall,
	deleteTable,
	findTable,
	getAllHall,
	insertHall,
	deleteHall,
	changeHall,
	changeTable,
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
	addHistory,
	addNotifi,
	findRequestOrderFullObject,
	findFullRequestOrderFullObject,
	findFullRequestOrderFullObjectByUserID,
	findFullRequestOrderFullObjectByHallID,
};
