"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NumberHelper {
    static getAsNumber(value, defaultValue) {
        if (typeof value === "string" && !!value) {
            value = parseFloat(value);
            if (!isFinite(value) || isNaN(value)) {
                value = undefined;
            }
        }
        if (typeof value === "number") {
            return value;
        }
        return typeof defaultValue === "undefined" ? 0 : defaultValue;
    }
    static getAsInteger(value, defaultValue) {
        if (typeof value === "string" && !!value) {
            value = parseInt(value, 10);
            if (!isFinite(value) || isNaN(value)) {
                value = undefined;
            }
        }
        if (typeof value === "number") {
            return value;
        }
        return typeof defaultValue === "undefined" ? 0 : defaultValue;
    }
    static sum(values, defaultValue) {
        var _a;
        return (_a = values.reduce((a, b) => {
            if (a == null || b == null) {
                return b !== null && b !== void 0 ? b : a;
            }
            return a + b;
        }, undefined)) !== null && _a !== void 0 ? _a : defaultValue;
    }
    static max(values, defaultValue) {
        var _a;
        return (_a = values.reduce((a, b) => {
            if (a == null || b == null) {
                return b !== null && b !== void 0 ? b : a;
            }
            return Math.max(a, b);
        }, undefined)) !== null && _a !== void 0 ? _a : defaultValue;
    }
    static min(values, defaultValue) {
        var _a;
        return (_a = values.reduce((a, b) => {
            if (a == null || b == null) {
                return b !== null && b !== void 0 ? b : a;
            }
            return Math.min(a, b);
        }, undefined)) !== null && _a !== void 0 ? _a : defaultValue;
    }
}
exports.default = NumberHelper;
//# sourceMappingURL=number.helper.js.map