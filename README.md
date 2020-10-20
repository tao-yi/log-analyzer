## Riot Log Processor

The solution for calculating the 90%, 95% and 99% percentile response time for READ API requests, based on ALL log files stored in /var/log/httpd/\*.log.

- [Riot Log Processor](#riot-log-processor)
  - [Installation](#installation)
  - [Build](#build)
  - [Run](#run)

## Installation

```bash
yarn
```

or

```bash
npm install
```

## Build

```bash
yarn build
```

or

```bash
npm run build
```

## Run

example:

```bash
# by default read files from ./var/log/httpd
yarn start
# or you can specify custom directory
yarn start /path/to/logs
```
