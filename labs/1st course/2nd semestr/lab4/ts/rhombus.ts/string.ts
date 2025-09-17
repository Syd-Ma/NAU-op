export class TextLine {
    protected _value: string;

    constructor();
    constructor(value: string);
    constructor(value?: string) {
        this._value = value ?? "";
    }

    get value(): string {
        return this._value;
    }

    length(): number {
        return this._value.length;
    }
}

export class DigitLine extends TextLine {
    constructor();
    constructor(value: string);
    constructor(value?: string) {
        super(value);
    }

    removeSymbol(symbol: string): void {
        this._value = this._value.replace(symbol, "");
    }

    get cleanedValue(): string {
        return this._value;
    }
}
