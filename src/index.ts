import chalk from "chalk";
const { cyan, green } = chalk;
import { getCliArgs, promptForDay, promptForParts } from "./cli";
import { fetchDayTitle, fetchInput } from "./aoc";
import { importDay, executePart } from "./runner";
import { loadConfig } from "./config.ts";

let { dayIndex, partIndex } = getCliArgs();
let { year } = await loadConfig();

// If day or part are not provided, prompt for it
dayIndex ??= await promptForDay();
const parts = [partIndex ?? (await promptForParts())].flat();

console.log(cyan.bold(`\n🎄 Advent of Code ${year}`));
console.log(green(await fetchDayTitle(dayIndex)));

const dayImplementation = await importDay(dayIndex);

for (const part of parts) {
	const input = await fetchInput(dayIndex);
	const title = `Part ${part}`;
	await executePart(title, dayImplementation[part], input);
}
