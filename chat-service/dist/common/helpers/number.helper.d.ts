export default class NumberHelper {
    static getAsNumber<T>(value: string | number | null | undefined, defaultValue: T): number | T;
    static getAsNumber(value: string | number | null | undefined): number;
    static getAsInteger<T>(value: string | number | null | undefined, defaultValue: T): number | T;
    static getAsInteger(value: string | number | null | undefined): number;
    static sum(values: Array<number | null | undefined>, defaultValue: number): number;
    static max(values: Array<number | null | undefined>, defaultValue: number): number;
    static min(values: Array<number | null | undefined>, defaultValue: number): number;
}
