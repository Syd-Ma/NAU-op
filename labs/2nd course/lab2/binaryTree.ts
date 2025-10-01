export class Node<T> {
    left: Node<T> | null = null;
    right: Node<T> | null = null;
    constructor(public data: T) {}
}

export class BinaryTree<T> implements Iterable<T> {
    private root: Node<T> | null = null;

    constructor(private compareFn: (a: T, b: T) => number) {}

    add(value: T): void {
        this.root = this._addRecursive(this.root, value);
    }

    private _addRecursive(node: Node<T> | null, value: T): Node<T> {
        if (!node) return new Node(value);

        if (this.compareFn(value, node.data) < 0) {
            node.left = this._addRecursive(node.left, value);
        } else {
            node.right = this._addRecursive(node.right, value);
        }
        return node;
    }

    private _preorder(node: Node<T> | null, result: T[]) {
        if (!node) return;
        result.push(node.data);
        this._preorder(node.left, result);
        this._preorder(node.right, result);
    }

    [Symbol.iterator](): Iterator<T> {
        const result: T[] = [];
        this._preorder(this.root, result);
        let index = 0;
        return {
            next: (): IteratorResult<T> =>
                index < result.length
                    ? { value: result[index++], done: false }
                    : { value: undefined as any, done: true }
        };
    }
}