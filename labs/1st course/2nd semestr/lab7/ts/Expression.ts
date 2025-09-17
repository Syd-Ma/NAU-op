import { MathHelper } from "./MathHelper";
import { ExpressionException } from "./ExpressionException";

export class Expression {
    private a: number;
    private b: number;
    private c: number;

    constructor(a: number, b: number, c: number) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public getA() { return this.a; }
    public getB() { return this.b; }
    public getC() { return this.c; }

    public setA(value: number) { this.a = value; }
    public setB(value: number) { this.b = value; }
    public setC(value: number) { this.c = value; }

    public calculate(): number {
        try {
            const numerator = 8 * MathHelper.safeLog10(this.b - 1) - this.c;
            const denominator = this.a * 2 + this.b / this.c;
            return numerator / denominator;
        } catch (e) {
            if (e instanceof ExpressionException) {
                console.error("Error during calculation:", e.message);
                return NaN;
            }
            throw e;
        }
    }
}