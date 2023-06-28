import { Transform } from "class-transformer";
import BooleanHelper from "../helpers/boolean.helper";

const toPlain = Transform((value) => value == null ? null : value as boolean, { toPlainOnly: true });
const toClass = Transform(
    (value) => {
        if (!Array.isArray(value)) {
            return typeof value === "undefined" ? undefined : BooleanHelper.getAsBoolean(value, null);
        }

        return value
            .map(
                (e) => typeof e === "undefined" ? undefined : BooleanHelper.getAsBoolean(e, null)
            ).filter(
                (e) => e != null
            );
    },
    { toClassOnly: true }
);

export const TransformBoolean = (): ((target: unknown, key: string) => void) => (target: unknown, key: string) => {
    toPlain(target, key);
    toClass(target, key);
};
