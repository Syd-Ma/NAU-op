export class CustomString {
    private value: string;

    constructor(str: string = "") {
        this.value = str;
    }

    static copy(other: CustomString): CustomString {
        return new CustomString(other.value);
    }

    length(): number {
        return this.value.length;
    }

    getValue(): string {
        return this.value;
    }

    add(other: CustomString | string): CustomString {
        return new CustomString(this.value + (typeof other === "string" ? other : other.value));
    }

    subtract(charToRemove: string): CustomString {
        return new CustomString(this.value.split(charToRemove).join(""));
    }
}