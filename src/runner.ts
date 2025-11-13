import chalk from "chalk";
const { gray } = chalk;
import { createSpinner } from "nanospinner";

/**
 * Execute a specific day and part of Advent of Code
 * @param day Day number (1-25)
 * @param part Part number (1 or 2)
 */
export const executePart = async (day: number, part: number): Promise<void> => {
	const partText = `Part ${part}`;
	const spinner = createSpinner(partText).start();
	const startTime = performance.now();
	try {
		// Execute the selected day and part
		const endTime = performance.now();
		const microseconds = ((endTime - startTime) * 1000).toFixed(0);
		const text = `${partText} ${gray(`Completed in ${microseconds}µs`)}`;
		spinner.success({ text });
	} catch (error) {
		const endTime = performance.now();
		const microseconds = ((endTime - startTime) * 1000).toFixed(0);
		const errorText = error instanceof Error ? error.message : String(error);
		const text = `${partText} ${gray(`Failed after ${microseconds}µs\n${errorText}`)}`;
		spinner.error({ text });
		process.exit(1);
	}
};
