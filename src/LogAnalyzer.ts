import { Log } from "./entity/Log";

export class LogAnalyzer {
  /**
   *
   * @param sortedLogs array of sorded logs in ascending order
   * @param percentile
   */
  static calculatePercentile(sortedLogs: Log[], percentile: number) {
    if (percentile < 0 || percentile > 100) {
      throw new Error(`Unsupported percentile: ${percentile}`);
    }

    const index = Math.floor(sortedLogs.length * (percentile / 100)) - 1;
    return `${percentile}% of requests return a response within ${sortedLogs[index].responseTime} ms`;
  }
}
