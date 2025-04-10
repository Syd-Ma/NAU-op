import { DigitLine } from "./string";

const digitLine = new DigitLine("123003450");

console.log("Початковий рядок:", digitLine.value);


digitLine.removeSymbol("0");

console.log("Після видалення символу '0':", digitLine.cleanedValue);
console.log("Довжина обробленого рядка:", digitLine.length());
