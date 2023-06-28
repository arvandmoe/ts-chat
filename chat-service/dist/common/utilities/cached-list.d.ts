import { Key } from "node-cache";
export declare class CachedList<TKey extends Key = Key, TValue = unknown> {
    readonly duration: number;
    private readonly cache;
    constructor(duration?: number, useClones?: boolean, checkPeriod?: number, onExpire?: ((key: TKey, value: TValue) => void));
    get(key: TKey | string): TValue | undefined;
    set(key: TKey | string, value: TValue, ttl?: number): boolean;
    del(keys: TKey | TKey[]): number;
    take(key: TKey): TValue | undefined;
    extend(key: TKey, ttl?: number): boolean;
    keys(): string[];
    has(key: TKey): boolean;
    flush(): void;
}
