import Student, { StudentClass } from "./dz";

const group121 = new StudentClass();
group121.addStudent(new Student("Олег", "Нечай", "Петрович"));
group121.addStudent(new Student("Ірина", "Петренко", "Олександрівна"));
group121.addStudent(new Student("Марія", "Нечай", "Іванівна"));

console.log(group121.getColumn("ім’я"));
console.log(group121.getColumn("прізвище"));
console.log(group121.getColumn("по батькові"));
console.log(group121.countNechai());