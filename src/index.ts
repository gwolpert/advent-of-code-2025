import chalk from "chalk";
const { cyan, green } = chalk;
import { getCliArgs, promptForDay, promptForParts } from "./cli";
import { fetchDayTitle } from "./aoc";
import { executePart } from "./runner";

let { day, part } = getCliArgs();

// If day or part are not provided, prompt for it
day ??= await promptForDay();
const parts = [part ?? (await promptForParts())].flat();

console.log(cyan.bold(`\n🎄 Advent of Code`));
console.log(green(await fetchDayTitle(day)));

for (const part of parts) {
	await executePart(day, part);
}
