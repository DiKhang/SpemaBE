/** @format */

import { getISOStringDate } from "../common";
import { Food, GroupFood, Hall, Table } from "../interface/system";
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
						$push: "$listFood",
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
};
