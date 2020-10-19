jest.mock("fs");
import * as fs from "fs";
import { LogReader } from "../LogReader";

describe("LogReader", () => {
  let instance1: LogReader;
  let instance2: LogReader;
  const filesInLogDirectory = ["a.log", "b.log", "c.log", "d.text"];
  const expectedOutput = Buffer.from('51.90.143.210 [2018/13/10:14:02:39] "GET /api/playeritems?playerId=3" 200 8723;');
  let readFileSync: jest.SpyInstance;
  let readdirSync: jest.SpyInstance;

  beforeAll(() => {
    readFileSync = jest.spyOn(fs, "readFileSync");
    readFileSync.mockImplementation(() => expectedOutput);

    readdirSync = jest.spyOn(fs, "readdirSync");
    readdirSync.mockImplementation(() => filesInLogDirectory as any);
  });

  afterEach(() => {
    readFileSync.mockClear();
    readdirSync.mockClear();
  });

  it("should have single instance", () => {
    instance1 = LogReader.getInstance();
    instance2 = LogReader.getInstance();
    expect(instance1).toBeInstanceOf(LogReader);
    expect(instance2).toBeInstanceOf(LogReader);
    expect(instance1 === instance2).toBe(true);
  });

  it("should read single file into buffer", () => {
    const result = instance1.read("any");
    expect(result).toBeInstanceOf(Buffer);
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  });

  it("should read multiple file into buffer", () => {
    const readdirSync = jest.fn().mockReturnValue(filesInLogDirectory);
    Object.assign(fs, { readdirSync });
    const result = instance1.readDir("dirName");
    expect(result).toBeInstanceOf(Buffer);
    expect(fs.readdirSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledTimes(filesInLogDirectory.length - 1);
  });
});
