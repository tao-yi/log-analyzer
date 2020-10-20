// jest.mock("fs");
// jest.mock("readline");
import * as fs from "fs";
import { ReadStream } from "fs";
import * as readline from "readline";
import { LineHandler, LogReader } from "../src/LogReader";

describe("LogReader", () => {
  let instance1: LogReader;
  let instance2: LogReader;
  let createInterface: jest.SpyInstance;
  let createReadStream: jest.SpyInstance;
  let readdirSync: jest.SpyInstance;

  const readStream = {} as ReadStream;
  const filesInLogDirectory = ["a.log", "b.log", "c.log", "d.text"];
  const expectedOutput = [
    Promise.resolve('51.90.143.210 [2018/13/10:14:02:39] "GET /api/playeritems?playerId=3" 200 1;'),
    Promise.resolve('51.90.143.210 [2018/13/10:14:02:39] "GET /api/playeritems?playerId=3" 200 2;'),
    Promise.resolve('51.90.143.210 [2018/13/10:14:02:39] "GET /api/playeritems?playerId=3" 200 3;')
  ];

  beforeAll(() => {
    createReadStream = jest.spyOn(fs, "createReadStream");
    createReadStream.mockImplementation(() => readStream);

    readdirSync = jest.spyOn(fs, "readdirSync");
    readdirSync.mockReturnValue(filesInLogDirectory);

    createInterface = jest.spyOn(readline, "createInterface");
    createInterface.mockReturnValue(expectedOutput);

    readdirSync = jest.spyOn(fs, "readdirSync");
    readdirSync.mockReturnValue(filesInLogDirectory);
  });

  afterEach(() => {
    createReadStream.mockClear();
    createInterface.mockClear();
    readdirSync.mockClear();
  });

  it("should have single instance", () => {
    instance1 = LogReader.getInstance();
    instance2 = LogReader.getInstance();
    expect(instance1).toBeInstanceOf(LogReader);
    expect(instance2).toBeInstanceOf(LogReader);
    expect(instance1 === instance2).toBe(true);
  });

  it("should read multiple files and each log line by line", async () => {
    const handler: LineHandler = jest.fn().mockImplementation((line: string) => void 0);
    const logFilesCount = filesInLogDirectory.length - 1;
    const linesCount = expectedOutput.length;
    await instance1.readDir("dirName", handler);
    expect(readdirSync).toHaveBeenCalledTimes(1);
    expect(createReadStream).toHaveBeenCalledTimes(logFilesCount);
    expect(handler).toHaveBeenCalledTimes(logFilesCount * linesCount);
    expect(createReadStream).toHaveBeenCalledTimes(logFilesCount);
    expect(readline.createInterface).toHaveBeenCalledTimes(logFilesCount);
  });
});
