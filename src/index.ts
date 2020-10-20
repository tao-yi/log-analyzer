import chalk from "chalk";
import { Log } from "./entity/Log";
import { Heap } from "./heap";
import { LogAnalyzer } from "./LogAnalyzer";
import { LogReader } from "./LogReader";

const cwd = process.cwd();
const defaultPath = `${cwd}/var/log/httpd`;

async function main() {
  const path = process.argv[2] || defaultPath;
  // create a file reader for reading logs
  const reader = LogReader.getInstance();
  const heap = new Heap<Log>();
  // read logs line by line
  await reader.readDir(path, (line) => {
    const log = Log.parse(line);
    if (log.isRead()) {
      heap.insert(log);
    }
  });
  // heap sort to get logs in ascending order
  heap.sort();

  console.log(chalk.cyanBright.bold(LogAnalyzer.calculatePercentile(heap.items, 90)));
  console.log(chalk.cyanBright.bold(LogAnalyzer.calculatePercentile(heap.items, 95)));
  console.log(chalk.cyanBright.bold(LogAnalyzer.calculatePercentile(heap.items, 99)));
}

main();
