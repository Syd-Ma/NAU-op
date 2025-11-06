class EventArgs {}
class EmptyEventArgs extends EventArgs {}
type EventHandler<TArgs extends EventArgs> = (sender: object, args: TArgs) => void;

class SimpleEvent<TArgs extends EventArgs> {
    private handlers = new Set<EventHandler<TArgs>>();
    add(handler: EventHandler<TArgs>): void { this.handlers.add(handler); }
    remove(handler: EventHandler<TArgs>): void { this.handlers.delete(handler); }
    invoke(sender: object, args: TArgs): void { for (const h of this.handlers) h(sender, args); }
}

class ItemEventArgs<T> extends EventArgs {
    constructor(public readonly item: T) { super(); }
}

class ListClearedEventArgs extends EventArgs {
    constructor(public readonly removedCount: number, public readonly clearedAt: Date) { super(); }
}

class SimpleList<T> implements Iterable<T> {
    private readonly items: T[] = [];
    readonly initialized = new SimpleEvent<EmptyEventArgs>();
    readonly itemAdded = new SimpleEvent<ItemEventArgs<T>>();
    readonly itemRemoved = new SimpleEvent<ItemEventArgs<T>>();
    readonly cleared = new SimpleEvent<ListClearedEventArgs>();
    constructor() { this.initialized.invoke(this, new EmptyEventArgs()); }
    add(item: T): void { this.items.push(item); this.itemAdded.invoke(this, new ItemEventArgs(item)); }
    remove(item: T): boolean {
        const i = this.items.indexOf(item);
        if (i === -1) return false;
        const [removed] = this.items.splice(i, 1);
        this.itemRemoved.invoke(this, new ItemEventArgs(removed));
        return true;
    }
    clear(): void {
        const n = this.items.length;
        this.items.length = 0;
        this.cleared.invoke(this, new ListClearedEventArgs(n, new Date()));
    }
    get count(): number { return this.items.length; }
    [Symbol.iterator](): Iterator<T> { return this.items[Symbol.iterator](); }
}

type LettersVsDigitsComparer = (s: string) => -1 | 0 | 1;

const comparerAnon: LettersVsDigitsComparer = function (s: string) {
    let letters = 0, digits = 0;
    for (const ch of s) {
        if (/\p{L}/u.test(ch)) letters++;
        else if (/\p{Nd}/u.test(ch)) digits++;
    }
    return Math.sign(letters - digits) as -1 | 0 | 1;
};

const comparerLambda: LettersVsDigitsComparer = (s: string) => {
    let letters = 0, digits = 0;
    for (const ch of s) {
        if (/\p{L}/u.test(ch)) letters++;
        else if (/\p{Nd}/u.test(ch)) digits++;
    }
    return Math.sign(letters - digits) as -1 | 0 | 1;
};

const describe = (sign: -1 | 0 | 1): string =>
    sign > 0 ? "більше літер" : sign < 0 ? "більше цифр" : "порівну";

function main(): void {
    console.log("=== Варіант 13 (TypeScript) ===\n");

    const samples = ["abc123", "onlyLetters", "123456", "мікс2025!", ""];
    console.log("(п.1) Перевірка рядків:");
    for (const s of samples) {
        const r1 = comparerAnon(s);
        const r2 = comparerLambda(s);
        console.log(`  "${s}": anon=${describe(r1)}, lambda=${describe(r2)}`);
    }

    console.log("\n=== Компонент SimpleList<T> ===");
    const list = new SimpleList<string>();

    const onInitialized: EventHandler<EmptyEventArgs> = (sender, _e) => {
        console.log("[Initialized] Створено SimpleList");
    };
    const onItemAdded: EventHandler<ItemEventArgs<string>> = (_sender, e) => {
        console.log(`[ItemAdded] Додано елемент: ${e.item}`);
    };
    const onItemRemoved: EventHandler<ItemEventArgs<string>> = (_sender, e) => {
        console.log(`[ItemRemoved] Видалено елемент: ${e.item}`);
    };
    const onCleared: EventHandler<ListClearedEventArgs> = (_sender, e) => {
        console.log(`[Cleared] Список очищено. Видалено: ${e.removedCount}. Час: ${e.clearedAt.toISOString()}`);
    };

    list.initialized.add(onInitialized);
    list.itemAdded.add(onItemAdded);
    list.itemRemoved.add(onItemRemoved);
    list.cleared.add(onCleared);

    list.add("alpha");
    list.add("beta");
    list.add("gamma");
    list.remove("beta");
    console.log(`Поточний розмір списку: ${list.count}`);
    list.clear();
    list.cleared.remove(onCleared);
}

main();
