/** @format */

interface Food {
	name: "string";
	id: number;
	price: number;
	category: "start" | "middle" | "end";
	decription: string;
	img: string;
}

interface GroupFood {
	name: "string";
	id: number;
	listFood: number[];
	price: number;
	decription: string;
}

interface Hall {
	name: string;
	type: "Normal" | "Gold" | "Silver" | "Luxury";
	isReady: boolean;
	size: number;
	userIDUse: number | null;
	userNameUse: string | null;
	id: number;
}

interface Table {
	name: string;
	sizeOnTable: number;
	isReady: boolean;
	userIDUse: number | null;
	userNameUse: string | null;
	listFood: number[];
	id: number;
	hallID: number;
}

interface RequestOrder {
	time: string;
	userID: number;
	userPhone: string;
	userName: string;
	type: "single" | "party";
	hallID: number;
	status: "accept" | "pending" | "denied" | "starting" | "end";
	isPaid: "deposited" | "paid" | "unpaid";
	totalMoney: number;
	tableID: number[];
	listFood: number[];
	note: string;
}

// accept: chap nhan , pending : dang xu ly, denied : tu choi , deposited : da coc , payment : da thanh toan , starting : bat dau, end:ket thuc

export { Food, GroupFood, Hall, Table, RequestOrder };
