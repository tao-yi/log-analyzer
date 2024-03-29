import * as fs from "fs";
import * as readline from "readline";

export type LineHandler = (line: string) => void;

/**
 * @desc utility class for reading log files
 */
export class LogReader {
  private directory: string;
  private static instance: LogReader;
  private constructor() {}

  /**
   * @desc check if target file is log file
   * @param file
   */
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
   * @desc read log files from specified directory line by line
   * @param directory
   */
  public async readDir(directory: string, handler: LineHandler) {
    try {
      const files = fs.readdirSync(directory);
      for (const file of files) {
        // read *.log files only
        if (this.isLogFile(file)) {
          const filePath = `${this.directory}/${file}`;
          const fileStream = fs.createReadStream(filePath);
          const lineReader = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
          });
          for await (const line of lineReader) {
            handler(line);
          }
        }
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
