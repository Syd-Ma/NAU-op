class VectorPolar {
  r: number;
  angle: number;

  constructor(r: number, angle: number) {
    this.r = r;
    this.angle = angle;
  }

  static random(): VectorPolar {
    return new VectorPolar(1 + Math.random() * 20, Math.random() * 360);
  }

  getX(): number {
    return this.r * Math.cos((this.angle * Math.PI) / 180);
  }

  getY(): number {
    return this.r * Math.sin((this.angle * Math.PI) / 180);
  }

  toString(): string {
    return `r=${this.r.toFixed(2)}, angle=${this.angle.toFixed(2)}, x=${this.getX().toFixed(2)}, y=${this.getY().toFixed(2)}`;
  }
}

class HashTableLevel1 {
  size: number;
  table: (VectorPolar | null)[];

  constructor(size: number) {
    this.size = size;
    this.table = new Array(size).fill(null);
  }

  hash(key: number): number {
    return Math.abs(Math.round(key * 1000)) % this.size;
  }

  insert(item: VectorPolar): boolean {
    const index = this.hash(item.getX());
    if (this.table[index] !== null) {
      return false;
    }
    this.table[index] = item;
    return true;
  }

  print(): void {
    for (let i = 0; i < this.size; i++) {
      if (this.table[i] === null) {
        console.log(i + ": empty");
      } else {
        console.log(i + ": key=" + this.table[i]!.getX().toFixed(2) + " " + this.table[i]!.toString());
      }
    }
  }
}

class HashTableLevel2 {
  size: number;
  table: VectorPolar[][];

  constructor(size: number) {
    this.size = size;
    this.table = [];
    for (let i = 0; i < size; i++) {
      this.table.push([]);
    }
  }

  hash(key: number): number {
    return Math.abs(Math.round(key * 1000)) % this.size;
  }

  insert(item: VectorPolar): boolean {
    const index = this.hash(item.getX());
    this.table[index].push(item);
    return true;
  }

  removeByCriterion(limitY: number): void {
    for (let i = 0; i < this.size; i++) {
      this.table[i] = this.table[i].filter((item) => item.getY() >= limitY);
    }
  }

  print(): void {
    for (let i = 0; i < this.size; i++) {
      if (this.table[i].length === 0) {
        console.log(i + ": empty");
      } else {
        for (const item of this.table[i]) {
          console.log(i + ": key=" + item.getX().toFixed(2) + " " + item.toString());
        }
      }
    }
  }
}

function generateWithoutCollisions(count: number, size: number): VectorPolar[] {
  const result: VectorPolar[] = [];
  const used = new Set<number>();
  const table = new HashTableLevel1(size);

  while (result.length < count) {
    const item = VectorPolar.random();
    const index = table.hash(item.getX());
    if (!used.has(index)) {
      used.add(index);
      result.push(item);
    }
  }

  return result;
}

function generateRandom(count: number): VectorPolar[] {
  const result: VectorPolar[] = [];
  for (let i = 0; i < count; i++) {
    result.push(VectorPolar.random());
  }
  return result;
}

const table1 = new HashTableLevel1(11);
const data1 = generateWithoutCollisions(7, 11);

console.log("Level 1");
for (const item of data1) {
  table1.insert(item);
}
table1.print();

const table2 = new HashTableLevel2(7);
const data2 = generateRandom(10);

console.log("\nLevel 2");
for (const item of data2) {
  table2.insert(item);
}
table2.print();

console.log("\nLevel 3");
table2.removeByCriterion(5);
table2.print();
