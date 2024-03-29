import { Comparable } from "../utils/Comparator";

/**
 * @desc domain object for log data
 */
export class Log implements Comparable<Log> {
  private constructor(
    public readonly ip: string,
    public readonly dateTime: string,
    public readonly httpMethod: string,
    public readonly url: string,
    public readonly status: number,
    public readonly responseTime: number
  ) {}

  public isEqualTo(target: Log): boolean {
    return target.responseTime === this.responseTime;
  }

  public isLessThan(target: Log): boolean {
    return this.responseTime < target.responseTime;
  }

  public isGreaterThan(target: Log): boolean {
    return this.responseTime > target.responseTime;
  }

  public isRead() {
    return this.httpMethod === "GET";
  }

  /**
   * @desc convert a record string into log domain object
   * @param record
   */
  static parse(record: String) {
    const metadata: string[] = record.replace(/\"/g, "").split(" ");
    const ip = metadata[0];
    const dateTime = metadata[1];
    const httpMethod = metadata[2];
    const url = metadata[3];
    const status = parseInt(metadata[4]);
    const responseTime = parseInt(metadata[5]);

    return new Log(ip, dateTime, httpMethod, url, status, responseTime);
  }
}
