"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const fs = __importStar(require("fs"));
const app_configuration_model_1 = require("./models/app-configuration.model");
const dotenv_1 = require("dotenv");
const configuration_model_1 = require("./models/configuration.model");
const lodash_1 = __importDefault(require("lodash"));
dotenv_1.config();
class Environment {
    constructor(isInDevelopment, configuration) {
        this.isInDevelopment = isInDevelopment;
        this.config = configuration;
    }
    static async getSnapshot() {
        return new Environment(this.isInDevelopment, await this.getConfig());
    }
    static get isInDevelopment() {
        var _a;
        const nodeEnvironment = ((_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "").trim().toLowerCase();
        return nodeEnvironment === "dev" || nodeEnvironment === "development";
    }
    static get isInTest() {
        var _a;
        const nodeEnvironment = ((_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "").trim().toLowerCase();
        return nodeEnvironment === "test";
    }
    static async getConfig() {
        var _a, _b;
        const configEnvironment = await configuration_model_1.Configuration.fromEnvironment();
        const configFileName = (_b = (_a = configEnvironment.app) === null || _a === void 0 ? void 0 : _a.configFileName) !== null && _b !== void 0 ? _b : app_configuration_model_1.AppConfiguration.getDefault().configFileName;
        if (!fs.existsSync(configFileName)) {
            throw new Error("Missing config file.");
        }
        const yamlContent = fs.readFileSync(configFileName, "utf8");
        const configFile = await configuration_model_1.Configuration.fromYAML(yamlContent);
        const defaultConfig = configuration_model_1.Configuration.getDefault();
        return lodash_1.default.merge({}, defaultConfig, Environment.cleanupConfiguration(configFile), Environment.cleanupConfiguration(configEnvironment));
    }
    static cleanupConfiguration(collection) {
        return lodash_1.default.transform(collection, (memo, val, key) => {
            let shouldEmit = val == null;
            if (!shouldEmit && lodash_1.default.isObject(val)) {
                val = Environment.cleanupConfiguration(val);
                shouldEmit = val == null;
            }
            if (!shouldEmit) {
                memo[key] = val;
            }
            else {
                delete memo[key];
            }
        });
    }
}
exports.Environment = Environment;
//# sourceMappingURL=environment.js.map