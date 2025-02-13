class Rhombus {
    constructor(
        public x1: number,
        public y1: number,
        public x2: number,
        public y2: number,
        public x3: number,
        public y3: number,
        public x4: number,
        public y4: number
    ) {}

    private sideLength(): number {
        return Math.round(Math.hypot(this.x2 - this.x1, this.y2 - this.y1));
    }

    private diagonal1(): number {
        return Math.round(Math.hypot(this.x3 - this.x1, this.y3 - this.y1));
    }

    private diagonal2(): number {
        return Math.round(Math.hypot(this.x4 - this.x2, this.y4 - this.y2));
    }

    getArea(): number {
        return Math.round((this.diagonal1() * this.diagonal2()) / 2);
    }

    getPerimeter(): number {
        return Math.round(4 * this.sideLength());
    }

    display(): void {
        console.log(`Vershyna: (${this.x1}, ${this.y1}), (${this.x2}, ${this.y2}), (${this.x3}, ${this.y3}), (${this.x4}, ${this.y4})`);
        console.log(`Area: ${this.getArea()}`);
        console.log(`Perimetr: ${this.getPerimeter()}`);
        console.log(`slideLength: ${this.sideLength()}`);
    }
}

const rhombus = new Rhombus(0, 0, 2, 2, 4, 0, 2, -2);
rhombus.display();