import NodeCache, { Key } from "node-cache";

export class CachedList<TKey extends Key = Key, TValue = unknown> {
    private readonly cache: NodeCache;

    public constructor(
        public readonly duration: number = 0,
        useClones = false,
        checkPeriod?: number,
        onExpire?: ((key: TKey, value: TValue) => void)
    ) {
        this.cache = new NodeCache(
            {
                stdTTL: duration <= 0 ? 0 : (duration / 1000),
                useClones,
                checkperiod: checkPeriod != null ? (checkPeriod / 1000) : undefined,
            }
        );

        if (onExpire) {
            this.cache.on("expired", onExpire);
        }
    }

    public get(
        key: TKey | string
    ): TValue | undefined {
        return this.cache.get<TValue>(key);
    }

    public set(
        key: TKey | string,
        value: TValue,
        ttl?: number
    ): boolean {
        if (ttl != null) {
            return this.cache.set(key, value, ttl / 1000);
        }

        return this.cache.set(key, value);
    }

    public del(
        keys: TKey | TKey[]
    ): number {
        return this.cache.del(keys);
    }

    public take(
        key: TKey
    ): TValue | undefined {
        return this.cache.take(key);
    }

    public extend(
        key: TKey,
        ttl?: number
    ): boolean {
        return this.cache.ttl(key, (ttl ?? this.duration) / 1000);
    }

    public keys(): string[] {
        return this.cache.keys();
    }

    public has(key: TKey): boolean {
        return this.cache.has(key);
    }

    public flush(): void {
        return this.cache.flushAll();
    }
}
