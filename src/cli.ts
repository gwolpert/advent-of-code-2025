import { parseArgs } from "util";
import chalk from "chalk";
const { red } = chalk;
import inquirer from "inquirer";

export type CliArgs = Partial<{
	dayIndex: number;
	partIndex: 1 | 2;
}>;

/**
 * Parse command-line arguments for day and part
 * @returns Object containing day and part if provided
 */
export const getCliArgs = (): CliArgs => {
	const { values } = parseArgs({
		args: process.argv.slice(2),
		options: {
			day: { type: "string", short: "D" },
			part: { type: "string", short: "P" },
		},
		strict: true,
		allowPositionals: false,
	});

	const params: CliArgs = {};

	if (values.day) {
		const day = parseInt(values.day, 10);
		if (isNaN(day) || day < 1 || day > 25) {
			console.error(red("Error: Day must be between 1 and 25"));
			process.exit(1);
		}
		params.dayIndex = day;
	}

	if (values.part) {
		const part = parseInt(values.part, 10);
		if (isNaN(part) || (part !== 1 && part !== 2)) {
			console.error(red("Error: Part must be either 1 or 2"));
			process.exit(1);
		}
		params.partIndex = part;
	}

	return params;
};

/**
 * Prompt user for day using inquirer
 * @returns Selected day number
 */
export const promptForDay = async (): Promise<number> => {
	const { day } = await inquirer.prompt<{ day: number }>([
		{
			type: "number",
			name: "day",
			message: "Which day would you like to run?",
			default: 1,
			validate: (input) => {
				const num = Number(input);
				if (num >= 1 && num <= 25) return true;
				return "Please enter a day between 1 and 25";
			},
		},
	]);
	return day;
};

/**
 * Prompt user for parts using inquirer
 * @returns Array of selected part numbers
 */
export const promptForParts = async (): Promise<Array<1 | 2>> => {
	const { parts } = await inquirer.prompt<{ parts: Array<1 | 2> }>([
		{
			type: "checkbox",
			name: "parts",
			message: "Which part(s) would you like to run?",
			choices: [
				{ name: "Part 1", value: 1, checked: true },
				{ name: "Part 2", value: 2, checked: true },
			],
			validate: (input) => {
				if (input.length === 0) return "Please select at least one part";
				return true;
			},
		},
	]);
	return parts;
};
