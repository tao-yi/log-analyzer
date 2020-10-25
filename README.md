## Riot Log Processor

The solution for calculating the 90%, 95% and 99% percentile response time for READ API requests, based on ALL log files stored in /var/log/httpd/\*.log.

- [Riot Log Processor](#riot-log-processor)
  - [Prerequisite](#Prerequisite)
  - [Installation](#installation)
  - [Build](#build)
  - [Run](#run)
  - [Populate Test Data](#populate-test-data)
  - [Unit Test](#unit-test)

## Prerequisite

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)

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

## Populate Test Data

The test log files are located in `./var/log/httpd` directory.

Test data can also be re-populated into `./var/log/httpd` using script:

```bash
yarn seed
```

## Unit Test

```bash
yarn test
```

## Time & Space Complexity Analysis

This is implemented using heap(max-heap) data structure and heap sort algorithm.

For input N lines of log:

- time complexity: O(N\*log(N))
- space complexity: O(N)
