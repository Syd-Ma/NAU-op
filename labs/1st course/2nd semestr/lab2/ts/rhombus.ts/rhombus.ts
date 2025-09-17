export class Rhombus {
    private x1: number; private y1: number;
    private x2: number; private y2: number;
    private x3: number; private y3: number;
    private x4: number; private y4: number;

    constructor();
    constructor(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number);
    constructor(rhombus: Rhombus);
    constructor(x1?: number | Rhombus, y1?: number, x2?: number, y2?: number, x3?: number, y3?: number, x4?: number, y4?: number) {
        if (x1 instanceof Rhombus) {
            this.x1 = x1.x1; this.y1 = x1.y1;
            this.x2 = x1.x2; this.y2 = x1.y2;
            this.x3 = x1.x3; this.y3 = x1.y3;
            this.x4 = x1.x4; this.y4 = x1.y4;
        } else if (typeof x1 === "number") {
            this.x1 = x1; this.y1 = y1!;
            this.x2 = x2!; this.y2 = y2!;
            this.x3 = x3!; this.y3 = y3!;
            this.x4 = x4!; this.y4 = y4!;
        } else {
            this.x1 = this.y1 = 0;
            this.x2 = 1; this.y2 = 0;
            this.x3 = 0; this.y3 = 1;
            this.x4 = -1; this.y4 = 0;
        }
    }

    getArea(): number {
        const d1 = Math.sqrt(Math.pow(this.x3 - this.x1, 2) + Math.pow(this.y3 - this.y1, 2));
        const d2 = Math.sqrt(Math.pow(this.x4 - this.x2, 2) + Math.pow(this.y4 - this.y2, 2));
        return (d1 * d2) / 2;
    }

    getPerimeter(): number {
        const side = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
        return 4 * side;
    }

    toString(): string {
        return `Rhombus: (${this.x1}, ${this.y1}), (${this.x2}, ${this.y2}), (${this.x3}, ${this.y3}), (${this.x4}, ${this.y4})`;
    }
}
