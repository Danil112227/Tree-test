"use strict";
class Tree {
    constructor(items) {
        var _a;
        this.items = items;
        this.itemMap = new Map();
        this.childrenMap = new Map();
        for (const item of items) {
            this.itemMap.set(item.id, item);
            if (!this.childrenMap.has(item.parent)) {
                this.childrenMap.set(item.parent, []);
            }
            (_a = this.childrenMap.get(item.parent)) === null || _a === void 0 ? void 0 : _a.push(item);
        }
    }

    getAll() {
        return this.items;
    }

    getItem(id) {
        return this.itemMap.get(id);
    }

    getChildren(id) {
        return this.childrenMap.get(id) || [];
    }

    getAllChildren(id) {
        const collectChildren = (parentId) => {
            const children = this.getChildren(parentId);
            const allDescendants = [...children];
            for (const child of children) {
                allDescendants.push(...collectChildren(child.id));
            }
            return allDescendants;
        };
        return collectChildren(id);
    }

    getAllParents(id) {
        const parents = [];
        let currentItem = this.getItem(id);
        while (currentItem && currentItem.parent !== "root") {
            const parent = this.getItem(currentItem.parent);
            if (parent) {
                parents.push(parent);
                currentItem = parent;
            }
            else {
                break;
            }
        }
        return parents;
    }
}

const items = [
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
