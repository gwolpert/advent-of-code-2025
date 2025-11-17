# advent-of-code-bun

Advent of Code solutions runner built with Bun.

## Installation

```bash
bun install
```

## Usage

### Run a specific day

```bash
bun run src/index.ts --day 1
```

### Run a specific day and part

```bash
bun run src/index.ts --day 1 --part 1
```

### Scaffold a new day

```bash
bun run src/index.ts --day 2 --scaffold
# or
bun run src/index.ts -D 2 -S
```

When you try to run a day that doesn't exist yet, you'll be prompted to scaffold it automatically.

### Interactive mode

Simply run without arguments to be prompted for day and parts:

```bash
bun run src/index.ts
```

## Running Tests

```bash
bun run test
```

Or test a specific day:

```bash
bun test src/days/01.test.ts
```

> **Note:** Use `bun run test` (not `bun test`) to properly exclude template files from test runs.

---

This project was created using `bun init` in bun v1.3.1. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
