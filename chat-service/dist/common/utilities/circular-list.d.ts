export declare class CircularList<T> {
    readonly capacity: number;
    private entries;
    constructor(capacity?: number, entries?: T[]);
    enqueue(item: T): void;
    clear(): void;
    dequeue(): T | undefined;
    get length(): number;
    getEntries(): T[];
}
