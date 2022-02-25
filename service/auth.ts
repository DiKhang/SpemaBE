/** @format */
import { getISOStringDate } from "../common";
import { UpdateUser, User } from "../interface/auth";
import client from "../utils/mongodb";

const findUser = async (username: string) => {
	const find = await client.collection("User").findOne({
		username: username,
	});
	return find;
};

const findUserByUserID = async (userID: string) => {
	const find = await client.collection("User").findOne({
		userID: userID,
	});
	return find;
};

const getAllUser = async () => {
	const find = await client.collection("User").find({}).toArray();
	return find;
};

const addUser = async (user: User) => {
	try {
		const add = await client.collection("User").insertOne(user);
		return add.insertedId;
	} catch (e: any) {
		console.log(e.message);
		return false;
	}
};

const activeUser = async (username: string) => {
	try {
		const update = await client.collection("User").updateOne(
			{
				username: username,
			},
			{
				$set: {
					active: true,
					activeAt: getISOStringDate(new Date()),
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		console.log(e.message);
		return false;
	}
};

const updateCode = async (username: string, code: string) => {
	try {
		const update = await client.collection("User").updateOne(
			{
				username: username,
			},
			{
				$set: {
					code: code,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		console.log(e.message);
		return false;
	}
};

const updatePass = async (username: string, password: string) => {
	try {
		const update = await client.collection("User").updateOne(
			{
				username: username,
			},
			{
				$set: {
					password: password,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		console.log(e.message);
		return false;
	}
};

const updateProfile = async (userID: number, user: UpdateUser) => {
	try {
		const update = await client.collection("User").updateOne(
			{
				userID: userID,
			},
			{
				$set: {
					...user,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		console.log(e.message);
		return false;
	}
};

const updatePassByUserID = async (userID: number, password: string) => {
	try {
		const update = await client.collection("User").updateOne(
			{
				userID: userID,
			},
			{
				$set: {
					password: password,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		console.log(e.message);
		return false;
	}
};

const updateActiveByUserID = async (userID: number, active: boolean) => {
	try {
		const update = await client.collection("User").updateOne(
			{
				userID: userID,
			},
			{
				$set: {
					active: active,
				},
			},
		);
		return update.matchedCount;
	} catch (e: any) {
		console.log(e.message);
		return false;
	}
};

export {
	findUser,
	getAllUser,
	addUser,
	activeUser,
	updateCode,
	updatePass,
	findUserByUserID,
	updateProfile,
	updatePassByUserID,
	updateActiveByUserID,
};
