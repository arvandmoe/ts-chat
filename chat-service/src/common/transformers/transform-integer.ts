import { Transform } from "class-transformer";
import NumberHelper from "../helpers/number.helper";

const toPlain = Transform((value) => value == null ? null : value as number, { toPlainOnly: true });
const toClass = Transform(
    (value) => {
        if (!Array.isArray(value)) {
            return typeof value === "undefined" ? undefined : NumberHelper.getAsInteger(value, null);
        }

        return value
            .map(
                (e) => typeof e === "undefined" ? undefined : NumberHelper.getAsInteger(e, null)
            ).filter(
                (e) => e != null
            );
    },
    { toClassOnly: true }
);

export const TransformInteger = (): ((target: unknown, key: string) => void) => (target: unknown, key: string) => {
    toPlain(target, key);
    toClass(target, key);
};
