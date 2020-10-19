import debug from "debug";
import { Comparable } from "./utils/Comarator";

export class Heap<T extends Comparable<T>> {
  private readonly heapContainer: T[];

  get size() {
    return this.heapContainer.length;
  }

  get items() {
    return this.heapContainer;
  }

  constructor(arr: T[] = []) {
    if (!arr.length) {
      this.heapContainer = arr;
    } else {
      this.heapContainer = this.build(arr);
    }
  }

  private swap(arr: T[], indexOne: number, indexTwo: number) {
    const logger = debug("heap swap");
    logger(`swap [${indexOne}] and [${indexTwo}]:`);
    logger(arr[indexOne], arr[indexTwo]);

    const tmp = arr[indexOne];
    arr[indexOne] = arr[indexTwo];
    arr[indexTwo] = tmp;
  }

  private build(arr: T[]) {
    const lastNonLeafNodeIndex = Math.floor(arr.length / 2) - 1;
    for (let i = lastNonLeafNodeIndex; i >= 0; i--) {
      this.heapify(arr, arr.length, i);
    }
    return arr;
  }

  public sort() {
    // heap sort
    for (let i = this.heapContainer.length - 1; i >= 0; i--) {
      this.swap(this.heapContainer, 0, i);
      // heapify root elemnt
      this.heapify(this.heapContainer, i, 0);
    }
  }

  public peek() {
    if (this.heapContainer.length === 0) {
      return null;
    }
    return this.heapContainer[0];
  }

  private heapify(arr: T[], size: number, lastNonLeafNodeIndex: number) {
    let maxIndex = lastNonLeafNodeIndex;

    const leftChildIndex = lastNonLeafNodeIndex * 2 + 1;
    const rightChildIndex = lastNonLeafNodeIndex * 2 + 2;
    const leftChild = arr[leftChildIndex];
    const rightChild = arr[rightChildIndex];

    if (leftChildIndex < size && leftChild.isGreaterThan(arr[maxIndex])) {
      maxIndex = leftChildIndex;
    }

    if (rightChildIndex < size && rightChild.isGreaterThan(arr[maxIndex])) {
      maxIndex = rightChildIndex;
    }

    if (maxIndex !== lastNonLeafNodeIndex) {
      this.swap(arr, maxIndex, lastNonLeafNodeIndex);
      this.heapify(arr, size, maxIndex);
    }
  }

  public insert(newValue: T) {
    const size = this.heapContainer.length;
    this.heapContainer.push(newValue);
    if (size > 0) {
      // start from the last non leaf node
      const lastNonLeafNodeIndex = Math.floor(size / 2) - 1;
      for (let i = lastNonLeafNodeIndex; i >= 0; i--) {
        this.heapify(this.heapContainer, this.heapContainer.length, i);
      }
    }
  }

  toString() {
    return `[${this.heapContainer.join(",")}]`;
  }
}
