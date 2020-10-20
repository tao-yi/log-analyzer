import { Comparator } from "../src/utils/Comarator";

describe("Comparator", () => {
  let comparator: Comparator<any> = new Comparator();

  describe("constructor", () => {
    it("should accept custom compare function", () => {
      const compareFunction = jest.fn();
      comparator = new Comparator(compareFunction);
      comparator.isEqual(1, 1);
      expect(compareFunction).toHaveBeenCalledTimes(1);
      comparator.isLessThan(1, 1);
      expect(compareFunction).toHaveBeenCalledTimes(2);
      comparator.isGreaterThan(1, 1);
      expect(compareFunction).toHaveBeenCalledTimes(3);
    });
  });

  describe("defaultCompareFunction", () => {
    it("defaultCompareFunction should return 0, -1, or 1", () => {
      expect(Comparator.defaultComparetFunction(2, 1)).toBe(1);
      expect(Comparator.defaultComparetFunction(2, 2)).toBe(0);
      expect(Comparator.defaultComparetFunction(2, 3)).toBe(-1);
    });
  });

  describe("instance methods", () => {
    it("isEqual should be ok", () => {
      comparator = new Comparator();
      const result = comparator.isEqual(1, 1);
      expect(result).toBe(true);
    });

    it("isLessThan should be ok", () => {
      comparator = new Comparator();
      const result = comparator.isLessThan(1, 2);
      expect(result).toBe(true);
    });

    it("isGreaterThan should be ok", () => {
      comparator = new Comparator();
      const result = comparator.isGreaterThan(2, 1);
      expect(result).toBe(true);
    });
  });
});
