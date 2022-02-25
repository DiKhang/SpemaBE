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

export { getAllFood, insertFood, changeFood, findFood, deleteFood };
