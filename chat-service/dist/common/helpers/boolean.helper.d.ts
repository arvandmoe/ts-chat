export default class BooleanHelper {
    static getAsBoolean<T>(value: string | number | boolean | null | undefined, defaultValue: T): boolean | T;
    static getAsBoolean(value: string | number | boolean | null | undefined): boolean;
}
