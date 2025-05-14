import { MyString } from "./MyString";

export class Text {
    private lines: MyString[] = [];

    addLine(line: MyString): void {
        this.lines.push(line);
    }

    removeLine(index: number): void {
        if (index >= 0 && index < this.lines.length) {
            this.lines.splice(index, 1);
        }
    }

    clearText(): void {
        this.lines = [];
    }

    getLongestLine(): MyString | null {
        if (this.lines.length === 0) return null;
        return this.lines.reduce((longest, current) =>
            current.getContent().length > longest.getContent().length ? current : longest
        );
    }

    getDigitsPercentage(): number {
        const totalChars = this.lines.reduce((sum, line) => sum + line.getContent().length, 0);
        const totalDigits = this.lines.reduce((sum, line) => sum + line.countDigits(), 0);
        if (totalChars === 0) return 0;
        return (totalDigits / totalChars) * 100;
    }

    getTotalCharactersCount(): number {
        return this.lines.reduce((sum, line) => sum + line.getContent().length, 0);
    }
}
