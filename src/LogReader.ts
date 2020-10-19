import { createReadStream, readdirSync, readFileSync } from "fs";
import * as readline from "readline";

export type LineHandler = (line: string) => void;

/**
 * @desc utility class for reading log files
 */
export class LogReader {
  private directory: string;
  private static instance: LogReader;
  private constructor() {}

  private isLogFile(file: string) {
    return file.endsWith(".log");
  }

  static getInstance(directory?: string): LogReader {
    if (!directory) {
      directory = `${process.cwd()}/var/log/httpd`;
    }
    if (!LogReader.instance) {
      LogReader.instance = new LogReader();
      LogReader.instance.directory = directory;
    }

    return LogReader.instance;
  }

  /**
   * @desc read a single log file
   * @param path the path to the log file to READ
   */
  public read(path: string): Buffer {
    const buffer = readFileSync(path);
    return buffer;
  }

  /**
   * @desc read log files from specified directory line by line
   * @param directory
   */
  public async readDir(directory: string, handler: LineHandler) {
    const files = readdirSync(directory);
    for (const file of files) {
      // read *.log files only
      if (this.isLogFile(file)) {
        const filePath = `${this.directory}/${file}`;
        const fileStream = createReadStream(filePath);
        const lineReader = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });
        for await (const line of lineReader) {
          handler(line);
        }
      }
    }
  }
}
