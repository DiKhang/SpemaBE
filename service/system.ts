/** @format */

import { getISOStringDate } from "../common";
import { Food, GroupFood } from "../interface/system";
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
};
