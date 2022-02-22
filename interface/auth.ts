/** @format */

interface User {
	userID: number;
	name: string;
	birthDay: string;
	rank: "normal" | "silver" | "gold";
	phone: number;
	username: string;
	active: boolean;
	password: string;
	code: string;
	createAt: string;
	activeAt: string;
}

export { User };
