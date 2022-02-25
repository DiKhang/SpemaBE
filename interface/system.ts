/** @format */

interface Food {
	name: "string";
	id: number;
	price: number;
	category: "start" | "middle" | "end";
	img: string;
}

interface GroupFood {
	name: "string";
	id: number;
	listFood: number[];
}

export { Food, GroupFood };
