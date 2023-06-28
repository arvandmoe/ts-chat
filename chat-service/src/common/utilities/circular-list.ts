export class CircularList<T> {
    private entries: T[];

    public constructor(
        public readonly capacity = 60,
        entries?: T[]
    ) {
        this.entries = entries?.filter((_, i) => i >= (entries.length - this.capacity)) ?? [];
    }

    public enqueue(item: T): void {
        while (this.entries.length >= this.capacity) {
            this.entries.shift();
        }

        this.entries.push(item);
    }

    public clear(): void {
        this.entries = [];
    }

    public dequeue(): T | undefined {
        return this.entries.shift();
    }

    public get length(): number {
        return this.entries.length;
    }

    public getEntries(): T[] {
        return [ ...this.entries ];
    }
}
