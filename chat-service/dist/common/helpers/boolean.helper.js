"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BooleanHelper {
    static getAsBoolean(value, defaultValue) {
        if (typeof value === "string" && value) {
            value = value.toLowerCase().trim();
            if (value === "true" || value === "yes" || value === "y" || value === "1" || value === "on") {
                return true;
            }
            if (value === "false" || value === "no" || value === "n" || value === "0" || value === "off") {
                return false;
            }
        }
        if (typeof value === "number") {
            return value > 0;
        }
        if (typeof value === "boolean") {
            return value;
        }
        return typeof defaultValue === "undefined" ? false : defaultValue;
    }
}
exports.default = BooleanHelper;
//# sourceMappingURL=boolean.helper.js.map