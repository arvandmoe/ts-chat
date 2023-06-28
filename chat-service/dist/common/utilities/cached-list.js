"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedList = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
class CachedList {
    constructor(duration = 0, useClones = false, checkPeriod, onExpire) {
        this.duration = duration;
        this.cache = new node_cache_1.default({
            stdTTL: duration <= 0 ? 0 : (duration / 1000),
            useClones,
            checkperiod: checkPeriod != null ? (checkPeriod / 1000) : undefined,
        });
        if (onExpire) {
            this.cache.on("expired", onExpire);
        }
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, value, ttl) {
        if (ttl != null) {
            return this.cache.set(key, value, ttl / 1000);
        }
        return this.cache.set(key, value);
    }
    del(keys) {
        return this.cache.del(keys);
    }
    take(key) {
        return this.cache.take(key);
    }
    extend(key, ttl) {
        return this.cache.ttl(key, (ttl !== null && ttl !== void 0 ? ttl : this.duration) / 1000);
    }
    keys() {
        return this.cache.keys();
    }
    has(key) {
        return this.cache.has(key);
    }
    flush() {
        return this.cache.flushAll();
    }
}
exports.CachedList = CachedList;
//# sourceMappingURL=cached-list.js.map