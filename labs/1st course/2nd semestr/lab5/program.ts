import { Figure, Trapezoid, Circle } from './string';

const figures: Figure[] = [
    new Trapezoid([0, 0], [4, 0], [3, 3], [1, 3]),
    new Circle(5)
];

figures.forEach((figure, index) => {
    console.log(`Figure ${index + 1}:`);
    console.log(`  Area: ${figure.area().toFixed(2)}`);
    console.log(`  Perimeter: ${figure.perimeter().toFixed(2)}\n`);
});
