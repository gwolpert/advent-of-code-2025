import chalk from "chalk";
const { cyan, green } = chalk;
import {
	getCliArgs,
	promptForDay,
	promptForParts,
	handleScaffolding,
} from "./cli";
import { fetchDayTitle, fetchInput } from "./aoc";
import { importDay, executePart } from "./runner";
import { loadConfig } from "./config.ts";

let { dayIndex, partIndex, scaffold } = getCliArgs();
let { year } = await loadConfig();

// When CLI args are missing, prompt the user for them
dayIndex ??= await promptForDay();
await handleScaffolding(dayIndex, scaffold);
const parts = [partIndex ?? (await promptForParts())].flat();

console.log(cyan.bold(`\n🎄 Advent of Code ${year}`));
console.log(green(await fetchDayTitle(dayIndex)));
const dayImplementation = await importDay(dayIndex);
const input = await fetchInput(dayIndex);

for (const part of parts) {
	const title = `Part ${part}`;
	await executePart(title, dayImplementation[part], input);
}
