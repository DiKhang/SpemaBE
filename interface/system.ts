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

export { Food, GroupFood };
