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

export { Food, GroupFood, Hall, Table };
