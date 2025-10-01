import { Product } from "./product";

export function demoCollections() {
    const arr: Product[] = [
        new Product("Хліб", 1, new Date(2025, 8, 25), 3),
        new Product("Молоко", 2, new Date(2025, 8, 28), 5),
    ];

    const arrList: any[] = [];
    arrList.push(new Product("Сир", 3, new Date(2025, 8, 27), 10));
    arrList.push(new Product("Кефір", 4, new Date(2025, 8, 20), 7));

    const list: Array<Product> = [];
    list.push(new Product("Масло", 5, new Date(2025, 8, 29), 20));
    list.push(new Product("Сік", 6, new Date(2025, 8, 30), 30));

    console.log("=== Масив ===");
    arr.forEach(p => console.log(p.toString()));

    console.log("\n=== Array<any> (non-generic) ===");
    arrList.forEach((p: Product) => console.log(p.toString()));

    console.log("\n=== Array<Product> (generic) ===");
    list.forEach(p => console.log(p.toString()));
}