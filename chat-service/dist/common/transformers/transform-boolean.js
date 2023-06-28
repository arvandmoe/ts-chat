"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformBoolean = void 0;
const class_transformer_1 = require("class-transformer");
const boolean_helper_1 = __importDefault(require("../helpers/boolean.helper"));
const toPlain = class_transformer_1.Transform((value) => value == null ? null : value, { toPlainOnly: true });
const toClass = class_transformer_1.Transform((value) => {
    if (!Array.isArray(value)) {
        return typeof value === "undefined" ? undefined : boolean_helper_1.default.getAsBoolean(value, null);
    }
    return value
        .map((e) => typeof e === "undefined" ? undefined : boolean_helper_1.default.getAsBoolean(e, null)).filter((e) => e != null);
}, { toClassOnly: true });
const TransformBoolean = () => (target, key) => {
    toPlain(target, key);
    toClass(target, key);
};
exports.TransformBoolean = TransformBoolean;
//# sourceMappingURL=transform-boolean.js.map