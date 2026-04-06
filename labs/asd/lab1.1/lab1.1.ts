class ArrayQueue {
    private arr: number[];
    private size: number;
    private capacity: number;

    constructor(capacity: number) {
        this.arr = new Array(capacity);
        this.size = 0;
        this.capacity = capacity;
    }

    isFull(): boolean {
        return this.size === this.capacity;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    enqueue(value: number): boolean {
        if (this.isFull()) return false;
        this.arr[this.size++] = value;
        return true;
    }

    dequeue(): number {
        if (this.isEmpty()) throw new Error("Empty");

        const val = this.arr[0];

        for (let i = 1; i < this.size; i++) {
            this.arr[i - 1] = this.arr[i];
        }

        this.size--;
        return val;
    }

    print() {
        console.log(this.arr.slice(0, this.size));
    }
}

class StackNode {
    value: string;
    next: StackNode | null;

    constructor(value: string) {
        this.value = value;
        this.next = null;
    }
}

class LinkedStack {
    private top: StackNode | null = null;

    isEmpty(): boolean {
        return this.top === null;
    }

    push(value: string) {
        const node = new StackNode(value);
        node.next = this.top;
        this.top = node;
    }

    pop(): string {
        if (this.isEmpty()) throw new Error("Empty");

        const val = this.top!.value;
        this.top = this.top!.next;
        return val;
    }

    print() {
        let cur = this.top;
        const res: string[] = [];

        while (cur) {
            res.push(cur.value);
            cur = cur.next;
        }

        console.log(res);
    }
}

const q = new ArrayQueue(10);

q.enqueue(3.7);
q.enqueue(-2.4);
q.enqueue(5.9);
q.enqueue(1.2);

q.print();

q.dequeue();
q.print();

const s = new LinkedStack();

s.push("101");
s.push("111");
s.push("10");

s.print();

s.pop();
s.print();

const queue = new ArrayQueue(10);

queue.enqueue(3.7);
queue.enqueue(-2.4);
queue.enqueue(5.9);
queue.enqueue(-1.2);
queue.enqueue(2.2);

const stack = new LinkedStack();

while (!queue.isEmpty()) {
    const val = queue.dequeue();

    if (val > 0) {
        const rounded = Math.round(val);
        const bin = rounded.toString(2);
        stack.push(bin);
    }
}

stack.print();