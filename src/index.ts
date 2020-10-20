import { Log } from "./entity/Log";
import { Heap } from "./heap";
import { LogAnalyzer } from "./LogAnalyzer";
import { LogReader } from "./LogReader";

const cwd = process.cwd();
const dir = `${cwd}/var/log/httpd`;

async function main() {
  const reader = LogReader.getInstance();
  const heap = new Heap<Log>();

  // read logs line by line
  await reader.readDir(dir, (line) => {
    const log = Log.fromString(line);
    heap.insert(log);
  });

  heap.sort();

  heap.items.forEach((i) => console.log(i.responseTime));

  const result = LogAnalyzer.calculatePercentile(heap.items, 95);
  console.log(result);
}

main();
