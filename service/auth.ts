/** @format */
import { User } from "../interface/auth";
import client from "../utils/mongodb";

const findUser = async (username: string) => {
	const find = await client.collection("User").findOne({
		username: username,
	});
	return find;
};

const getAllUser = async () => {
	const find = await client.collection("User").find({}).toArray();
	return find;
};

const addUser = async (user: User) => {
	try {
		const addUser = await client.collection("User").insertOne(user);
		return addUser.insertedId;
	} catch (e: any) {
		console.log(e.message);
		return false;
	}
};

export { findUser, getAllUser, addUser };
