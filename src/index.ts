import { Log } from "./entity/Log";
import { Heap } from "./heap";
import { LogReader } from "./LogReader";

const cwd = process.cwd();
const dir = `${cwd}/var/log/httpd`;

async function main() {
  const reader = LogReader.getInstance();
  // read logs
  // const logsString = reader.readDir(dir).toString();
  // calculate percentile
  // const logsArray = logsString.split("\n");
  // console.log(logsArray);

  const heap = new Heap<Log>();

  // read logs line by line
  await reader.readDir(dir, (line) => {
    const log = Log.fromString(line);
    heap.insert(log);
  });

  // console.log(heap.size);
  // console.log(heap.items);
}

main();
