import { Log } from "../src/entity/Log";

describe("Log", () => {
  const ip = "81.225.23.146";
  const dateTime = "[2018/13/10:14:02:39]";
  const httpMethod = "GET";
  const url = "/api/playeritems?playerId=3";
  const status = 200;
  const responseTime1 = 1;
  const responseTime2 = 2;
  const log1 = `${ip} ${dateTime} "${httpMethod} ${url}" ${status} ${responseTime1}`;
  const log2 = `${ip} ${dateTime} "${httpMethod} ${url}" ${status} ${responseTime2}`;

  describe("fromString", () => {
    it("should return Log domain object", () => {
      const expectedOuput = {
        ip,
        dateTime,
        httpMethod,
        url,
        status,
        responseTime: responseTime1
      };

      expect(Log.fromString(log1)).toEqual(expectedOuput);
    });
  });

  it("should implement Comparable", () => {
    const l1 = Log.fromString(log1);
    const l2 = Log.fromString(log2);

    expect(l1.isEqualTo(l2)).toBe(false);
    expect(l1.isLessThan(l2)).toBe(true);
    expect(l2.isGreaterThan(l1)).toBe(true);
  });
});
