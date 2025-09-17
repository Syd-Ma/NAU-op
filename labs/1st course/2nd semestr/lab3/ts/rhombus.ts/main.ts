import { CustomString } from "./String";

const CS2 = new CustomString("Hello");
const CS3 = new CustomString("0World0").subtract("0");
const CS1 = CS2.add(CS3);

console.log("CS1", CS1.getValue());
console.log("CS2", CS2.getValue());
console.log("CS3", CS3.getValue());
