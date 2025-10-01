import { Product } from "./product";
import { demoCollections } from "./collections";
import { BinaryTree } from "./binaryTree";

demoCollections();

const tree = new BinaryTree<Product>((a, b) => a.code - b.code);

tree.add(new Product("Хліб", 1, new Date(2025, 8, 25), 3));
tree.add(new Product("Молоко", 2, new Date(2025, 8, 28), 5));
tree.add(new Product("Сік", 6, new Date(2025, 8, 30), 30));

console.log("\n=== Preorder traversal ===");
for (const product of tree) {
    console.log(product.toString());
}