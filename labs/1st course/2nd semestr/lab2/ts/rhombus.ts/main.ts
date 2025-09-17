import { Rhombus } from "./Rhombus";

const r1 = new Rhombus();
const r2 = new Rhombus(0, 0, 2, 0, 1, 2, -1, 2);
const r3 = new Rhombus(r2);

console.log(r1.toString());
console.log(`Area: ${r1.getArea()}, Perimeter: ${r1.getPerimeter()}`);

console.log(r2.toString());
console.log(`Area: ${r2.getArea()}, Perimeter: ${r2.getPerimeter()}`);

console.log(r3.toString());
console.log(`Area: ${r3.getArea()}, Perimeter: ${r3.getPerimeter()}`);
