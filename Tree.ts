type Item = {
	id: string | number;
	parent: string | number;
	type?: string | null;
};

class Tree {
	private items: Item[];
	private itemMap: Map<string | number, Item>;
	private childrenMap: Map<string | number, Item[]>;

	constructor(items: Item[]) {
		this.items = items;
		this.itemMap = new Map();
		this.childrenMap = new Map();

		for (const item of items) {
			this.itemMap.set(item.id, item);

			if (!this.childrenMap.has(item.parent)) {
				this.childrenMap.set(item.parent, []);
			}

			this.childrenMap.get(item.parent)?.push(item);
		}
	}

	getAll(): Item[] {
		return this.items;
	}

	getItem(id: string | number): Item | undefined {
		return this.itemMap.get(id);
	}

	getChildren(id: string | number): Item[] {
		return this.childrenMap.get(id) || [];
	}

	getAllChildren(id: string | number): Item[] {
		const collectChildren = (parentId: string | number): Item[] => {
			const children = this.getChildren(parentId);
			const allDescendants: Item[] = [...children];
			for (const child of children) {
				allDescendants.push(...collectChildren(child.id));
			}
			return allDescendants;
		};

		return collectChildren(id);
	}

	getAllParents(id: string | number): Item[] {
		const parents: Item[] = [];
		let currentItem = this.getItem(id);

		while (currentItem && currentItem.parent !== "root") {
			const parent = this.getItem(currentItem.parent);
			if (parent) {
				parents.push(parent);
				currentItem = parent;
			} else {
				break;
			}
		}

		return parents;
	}
}

const items: Item[] = [
	{ id: 1, parent: "root" },
	{ id: 2, parent: 1, type: "test" },
	{ id: 3, parent: 1, type: "test" },

	{ id: 4, parent: 2, type: "test" },
	{ id: 5, parent: 2, type: "test" },
	{ id: 6, parent: 2, type: "test" },

	{ id: 7, parent: 4, type: null },
	{ id: 8, parent: 4, type: null },
];

const ts = new Tree(items);

console.log(ts.getAll());
console.log(ts.getItem(7));
console.log(ts.getChildren(4));
console.log(ts.getAllChildren(2));
console.log(ts.getAllParents(7));
