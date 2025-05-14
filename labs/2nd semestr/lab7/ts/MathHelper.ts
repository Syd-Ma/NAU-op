import { ExpressionException } from "./ExpressionException";

export class MathHelper {
    static safeLog10(x: number): number {
        if (x <= 0) {
            throw new ExpressionException(`Invalid argument for log10: ${x}`);
        }
        return Math.log(x) / Math.LN10;
    }
}
