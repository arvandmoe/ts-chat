export default class NumberHelper {
    public static getAsNumber<T>(value: string | number | null | undefined, defaultValue: T): number | T
    public static getAsNumber(value: string | number | null | undefined): number
    public static getAsNumber<T = number>(value: string | number | null | undefined, defaultValue?: T): number | T {
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

    public static getAsInteger<T>(value: string | number | null | undefined, defaultValue: T): number | T
    public static getAsInteger(value: string | number | null | undefined): number
    public static getAsInteger<T = number>(value: string | number | null | undefined, defaultValue?: T): number | T {
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

    public static sum(values: Array<number | null | undefined>, defaultValue: number): number
    public static sum(values: Array<number | null | undefined>, defaultValue?: number): number | undefined {
        return values.reduce<number | undefined>(
            (a, b) => {
                if (a == null || b == null) {
                    return b ?? a;
                }

                return a + b;
            },
            undefined
        ) ?? defaultValue;
    }

    public static max(values: Array<number | null | undefined>, defaultValue: number): number
    public static max(values: Array<number | null | undefined>, defaultValue?: number): number | undefined {
        return values.reduce<number | undefined>(
            (a, b) => {
                if (a == null || b == null) {
                    return b ?? a;
                }

                return Math.max(a, b);
            },
            undefined
        ) ?? defaultValue;
    }

    public static min(values: Array<number | null | undefined>, defaultValue: number): number
    public static min(values: Array<number | null | undefined>, defaultValue?: number): number | undefined {
        return values.reduce<number | undefined>(
            (a, b) => {
                if (a == null || b == null) {
                    return b ?? a;
                }

                return Math.min(a, b);
            },
            undefined
        ) ?? defaultValue;
    }
}
