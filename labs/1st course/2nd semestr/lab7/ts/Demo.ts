import { Expression } from "./Expression";

const expressions: Expression[] = [
    new Expression(1, 10, 2),
    new Expression(2, 0, 3),
    new Expression(3, 20, 0),
    new Expression(1, 5, 2)
];

expressions.forEach((exp, index) => {
    const result = exp.calculate();
    console.log(`Expression ${index + 1}:`, isNaN(result) ? "Invalid" : result);
});