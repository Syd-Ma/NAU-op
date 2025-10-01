export class Product {
    constructor(
        public name: string,
        public code: number,
        public manufactureDate: Date,
        public shelfLifeDays: number
    ) {}

    isValid(): boolean {
        return new Date() <= this.getExpirationDate();
    }

    getExpirationDate(): Date {
        return new Date(
            this.manufactureDate.getTime() + this.shelfLifeDays * 24 * 60 * 60 * 1000
        );
    }

    toString(): string {
        return `[${this.code}] ${this.name}, виготовлено: ${this.manufactureDate.toDateString()}, ` +
            `дійсно до: ${this.getExpirationDate().toDateString()}, ` +
            `придатний: ${this.isValid()}`;
    }
}