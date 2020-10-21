import chalk from "chalk";
import { Log } from "./entity/Log";
import { Heap } from "./heap";
import { LogAnalyzer } from "./LogAnalyzer";
import { LogReader } from "./LogReader";

const cwd = process.cwd();
const defaultPath = `${cwd}/var/log/httpd`;

/**
 * Time Complexity: O(N*log(N))
 * Space Complexity: O(N)
 */
async function main() {
  const path = process.argv[2] || defaultPath;
  // create a file reader for reading logs
  const reader = LogReader.getInstance();
  const heap = new Heap<Log>();

  // heap.insert() takes: O(log(N))
  // for N lines of log, it takes O(N*log(N)) time, O(N) space
  await reader.readDir(path, (line) => {
    // read logs line by line
    const log = Log.parse(line);
    if (log.isRead()) {
      // O(log(N))
      heap.insert(log);
    }
  });

  // heap sort to get logs in ascending order takes: O(N*log(N)) time
  heap.sort();

  console.log(chalk.cyanBright.bold(LogAnalyzer.calculatePercentile(heap.items, 90)));
  console.log(chalk.cyanBright.bold(LogAnalyzer.calculatePercentile(heap.items, 95)));
  console.log(chalk.cyanBright.bold(LogAnalyzer.calculatePercentile(heap.items, 99)));
}

main();
