export abstract class Figure {
    abstract area(): number;
    abstract perimeter(): number;
}

type Point = [number, number];

export class Trapezoid extends Figure {
    constructor(
        private A: Point,
        private B: Point,
        private C: Point,
        private D: Point
    ) {
        super();
    }

    private distance(p1: Point, p2: Point): number {
        return Math.sqrt(
            Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2)
        );
    }

    area(): number {
        const h = Math.abs(this.A[1] - this.C[1]);
        const a = this.distance(this.A, this.B);
        const b = this.distance(this.C, this.D);
        return 0.5 * (a + b) * h;
    }

    perimeter(): number {
        return (
            this.distance(this.A, this.B) +
            this.distance(this.B, this.C) +
            this.distance(this.C, this.D) +
            this.distance(this.D, this.A)
        );
    }
}

export class Circle extends Figure {
    constructor(private radius: number) {
        super();
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }

    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}
