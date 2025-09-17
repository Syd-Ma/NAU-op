import { IDigitAnalyzer } from "./IDigitAnalyzer";

export class MyString implements IDigitAnalyzer {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    getContent(): string {
        return this.content;
    }

    get length(): number {
        return this.content.length;
    }

    countDigits(): number {
        return (this.content.match(/\d/g) || []).length;
    }

    digitsPercentage(): number {
        if (this.content.length === 0) return 0;
        return (this.countDigits() / this.content.length) * 100;
    }
}