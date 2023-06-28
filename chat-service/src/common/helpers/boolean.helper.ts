export default class BooleanHelper {
    public static getAsBoolean<T>(value: string | number | boolean | null | undefined, defaultValue: T): boolean | T
    public static getAsBoolean(value: string | number | boolean | null | undefined): boolean
    public static getAsBoolean<T>(value: string | number | boolean | null | undefined, defaultValue?: T): boolean | T {
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
