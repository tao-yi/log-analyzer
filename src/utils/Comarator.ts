export type CompareFunction<T> = (a: T, b: T) => 0 | 1 | -1;

export interface Comparable<T> {
  isEqualTo(target: T): boolean;
  isLessThan(target: T): boolean;
  isGreaterThan(target: T): boolean;
}

export class Comparator<T> {
  private compare: CompareFunction<T>;

  static defaultComparetFunction(a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }

  constructor(compareFunction?: CompareFunction<T>) {
    this.compare = compareFunction || Comparator.defaultComparetFunction;
  }

  isEqual(a: T, b: T) {
    return this.compare(a, b) === 0;
  }

  isLessThan(a: T, b: T) {
    return this.compare(a, b) === -1;
  }

  isLessThanOrEqual(a: T, b: T) {
    return this.isLessThan(a, b) || this.isEqual(a, b);
  }

  isGreaterThan(a, b) {
    return this.compare(a, b) === 1;
  }

  isGreaterThanOrEqual(a, b) {
    return this.isEqual(a, b) || this.isGreaterThan(a, b);
  }
}
