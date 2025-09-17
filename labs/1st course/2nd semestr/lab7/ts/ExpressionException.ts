export class ExpressionException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ExpressionException";
    }
}
