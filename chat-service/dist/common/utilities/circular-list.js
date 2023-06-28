"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularList = void 0;
class CircularList {
    constructor(capacity = 60, entries) {
        var _a;
        this.capacity = capacity;
        this.entries = (_a = entries === null || entries === void 0 ? void 0 : entries.filter((_, i) => i >= (entries.length - this.capacity))) !== null && _a !== void 0 ? _a : [];
    }
    enqueue(item) {
        while (this.entries.length >= this.capacity) {
            this.entries.shift();
        }
        this.entries.push(item);
    }
    clear() {
        this.entries = [];
    }
    dequeue() {
        return this.entries.shift();
    }
    get length() {
        return this.entries.length;
    }
    getEntries() {
        return [...this.entries];
    }
}
exports.CircularList = CircularList;
//# sourceMappingURL=circular-list.js.map