"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformNumber = void 0;
const class_transformer_1 = require("class-transformer");
const number_helper_1 = __importDefault(require("../helpers/number.helper"));
const toPlain = class_transformer_1.Transform((value) => value == null ? null : value, { toPlainOnly: true });
const toClass = class_transformer_1.Transform((value) => {
    if (!Array.isArray(value)) {
        return typeof value === "undefined" ? undefined : number_helper_1.default.getAsNumber(value, null);
    }
    return value
        .map((e) => typeof e === "undefined" ? undefined : number_helper_1.default.getAsNumber(e, null)).filter((e) => e != null);
}, { toClassOnly: true });
const TransformNumber = () => (target, key) => {
    toPlain(target, key);
    toClass(target, key);
};
exports.TransformNumber = TransformNumber;
//# sourceMappingURL=transform-number.js.map