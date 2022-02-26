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
	requestOrderID: number | null;
	id: number;
}

interface Table {
	name: string;
	sizeOnTable: number;
	isReady: boolean;
	userIDUse: number | null;
	userNameUse: string | null;
	listFood: number[];
	requestOrderID: number | null;
	id: number;
	hallID: number;
}

interface RequestOrder {
	time: string;
	timeStart: string;
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
	id: number;
}

// accept: chap nhan , pending : dang xu ly, denied : tu choi , deposited : da coc , payment : da thanh toan , starting : bat dau, end:ket thuc

interface History {
	time: string;
	userIDAction: number;
	content: string;
	actionObject: object;
}

interface Notifi {
	userID: number;
	content: string;
	actionObject: object;
	time: string;
}

export { Food, GroupFood, Hall, Table, RequestOrder, History, Notifi };
