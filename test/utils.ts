import * as fs from "fs";

const cwd = process.cwd();
const directory = `${cwd}/var/log/httpd`;
const logMessage = '[2018/13/10:14:02:39] "GET /api/playeritems?playerId=3" 200';
export async function generateMockLog(numOfFiles: number = 3, numberOfLines = 100) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  let stream: fs.WriteStream;
  let path: string;

  for (let i = 0; i < numOfFiles; i++) {
    path = `${directory}/${year}-${month}-${i}.log`;
    stream = fs.createWriteStream(path);

    for (let j = 0; j < numberOfLines; j++) {
      stream.write(`${RandomGenerator.randomIp()} ${logMessage} ${RandomGenerator.randomResponseTime()}\n`);
    }
  }
}

class RandomGenerator {
  static randomInt(max: number = 10): number {
    return Math.floor(Math.random() * max);
  }

  static randomIp(): string {
    return [
      RandomGenerator.randomInt(256),
      RandomGenerator.randomInt(256),
      RandomGenerator.randomInt(256),
      RandomGenerator.randomInt(256)
    ].join(".");
  }

  static randomResponseTime(): number {
    return parseInt(
      [
        RandomGenerator.randomInt(11),
        RandomGenerator.randomInt(),
        RandomGenerator.randomInt(),
        RandomGenerator.randomInt()
      ].join("")
    );
  }
}

generateMockLog();
