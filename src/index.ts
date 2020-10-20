// import program from "commander";
import { Log } from "./entity/Log";
import { Heap } from "./heap";
import { LogAnalyzer } from "./LogAnalyzer";
import { LogReader } from "./LogReader";

const cwd = process.cwd();
const dir = `${cwd}/var/log/httpd`;

async function main() {
  // program.version("1.0.0").description("riot");

  const reader = LogReader.getInstance();
  const heap = new Heap<Log>();

  // read logs line by line
  await reader.readDir(dir, (line) => {
    const log = Log.parse(line);
    if (log.isRead()) {
      heap.insert(log);
    }
  });

  console.log(heap.size);
  console.log(heap.items);

  heap.sort();

  heap.items.forEach((i) => console.log(i.responseTime));

  const result = LogAnalyzer.calculatePercentile(heap.items, 95);
  console.log(result);
}

main();
