import { Log } from "../src/entity/Log";
import { Heap } from "../src/heap";

describe("Heap", () => {
  /**
   * input: [4, 10, 3, 5, 1]
   * max heap: [10, 5, 3, 4, 1]
   */

  let heap: Heap<Log>;
  const log1 = Log.parse('81.225.23.146 [2018/13/10:14:02:39] "GET /api/playeritems?playerId=3" 200 4');
  const log2 = Log.parse('226.186.166.148 [2018/13/10:14:02:39] "GET /api/playeritems?playerId=3" 200 10');
  const log3 = Log.parse('76.223.175.57 [2018/13/10:14:02:39] "GET /api/playeritems?playerId=3" 200 3');
  const log4 = Log.parse('121.34.51.222 [2018/13/10:14:02:39] "GET /api/playeritems?playerId=3" 200 5');
  const log5 = Log.parse('36.121.90.233 [2018/13/10:14:02:39] "GET /api/playeritems?playerId=3" 200 1');

  const maxHeap = [log2, log4, log3, log1, log5];

  it("constructor should produce max heap", () => {
    heap = new Heap([log1, log2, log3, log4, log5]);
    expect(heap.items).toEqual(maxHeap);
  });

  it("insert should produce max heap", () => {
    heap = new Heap();
    heap.insert(log1);
    heap.insert(log2);
    heap.insert(log3);
    heap.insert(log4);
    heap.insert(log5);
    expect(heap.items).toEqual(maxHeap);
  });

  it("sort should sort items in ascending order", () => {
    heap = new Heap([log1, log2, log3, log4, log5]);
    heap.sort();

    expect(heap.items).toEqual([log5, log3, log1, log4, log2]);
  });
});
