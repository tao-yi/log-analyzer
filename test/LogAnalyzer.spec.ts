import { Log } from "../src/entity/Log";
import { LogAnalyzer } from "../src/LogAnalyzer";

describe("LogProcessor", () => {
  const logs: Log[] = [];

  beforeAll(() => {
    // populate 100 mock log
    for (let i = 1; i <= 100; i++) {
      logs.push(Log.parse(`81.225.23.146 [2018/13/10:14:02:39] "GET /api/playeritems?playerId=3" 200 ${i}`));
    }
  });

  describe("calculatePercentile", () => {
    it("should output correct percentile", () => {
      let expectedOutput = "90% of requests return a response within 90 ms";
      let output = LogAnalyzer.calculatePercentile(logs, 90);
      expect(output).toStrictEqual(expectedOutput);

      expectedOutput = "95% of requests return a response within 95 ms";
      output = LogAnalyzer.calculatePercentile(logs, 95);
      expect(output).toStrictEqual(expectedOutput);

      expectedOutput = "99% of requests return a response within 99 ms";
      output = LogAnalyzer.calculatePercentile(logs, 99);
      expect(output).toStrictEqual(expectedOutput);
    });

    it("should throw error with invalid percentile input", () => {
      expect(() => LogAnalyzer.calculatePercentile(logs, -1)).toThrow();
      expect(() => LogAnalyzer.calculatePercentile(logs, 101)).toThrow();
    });
  });
});
