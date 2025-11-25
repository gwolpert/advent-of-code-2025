import { parseArgs } from "util";
import chalk from "chalk";
const { red, green, gray } = chalk;
import inquirer from "inquirer";
import { join } from "node:path";
import { exists } from "node:fs/promises";
import { createSpinner } from "nanospinner";
import { DateTime } from "luxon";

export type CliArgs = Partial<{
	dayIndex: number;
	partIndex: 1 | 2;
	scaffold: boolean;
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
			scaffold: { type: "boolean", short: "S" },
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
		if (part !== 1 && part !== 2) {
			console.error(red("Error: Part must be either 1 or 2"));
			process.exit(1);
		}
		params.partIndex = part;
	}

	if (values.scaffold) {
		params.scaffold = true;
	}

	return params;
};

/**
 * Prompt user for day using inquirer
 * @returns Selected day number
 */
export const promptForDay = async (): Promise<number> => {
	const dayOfMonth = Math.min(DateTime.local().day, 25);
	const { day } = await inquirer.prompt<{ day: number }>([
		{
			type: "number",
			name: "day",
			message: "Which day would you like to run?",
			default: dayOfMonth,
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

/**
 * Handle scaffolding flow for a day
 * @param day Day number
 * @param explicitScaffold Whether --scaffold flag was provided
 */
export const handleScaffolding = async (
	day: number,
	explicitScaffold?: boolean
): Promise<void> => {
	const dayStr = day.toString().padStart(2, "0");
	const dayPath = join(import.meta.dir, "days", `${dayStr}.ts`);
	const isDayScaffolded = await exists(dayPath);

	// Day already exists - return early or confirm
	if (isDayScaffolded) {
		if (!explicitScaffold) return;
		console.log(green(`✓ Day ${day} is already scaffolded`));
		process.exit(0);
	}

	// Day doesn't exist - scaffold if explicit flag or user confirms
	const shouldScaffold = explicitScaffold ?? (await promptScaffold(day));
	if (!shouldScaffold) process.exit(0);

	const spinner = createSpinner(`Scaffolding Day ${day}`).start();
	const daysDir = join(import.meta.dir, "days");
	const templatesDir = join(import.meta.dir, "templates");

	// Clean up template-specific content
	const cleanTemplate = async (file: string) => {
		const path = join(templatesDir, file);
		const content = await Bun.file(path).text();
		return content
			.replace(/\/\/ @ts-nocheck\n?/g, "")
			.replace(/const DAY_NUMBER = 99;\n?/g, "")
			.replace(/DAY_NUMBER/g, day.toString());
	};

	const dayContent = await cleanTemplate("template.ts");
	await Bun.write(dayPath, dayContent);

	const testContent = await cleanTemplate("template-test.ts");
	const testPath = join(daysDir, `${dayStr}.test.ts`);
	await Bun.write(testPath, testContent);

	spinner.success({
		text: `Scaffolded Day ${day}${gray(`\n  - ${dayPath}\n  - ${testPath}`)}`,
	});
	process.exit(0);
};

/**
 * Prompt user to scaffold a day
 * @param day Day number (1-25)
 * @returns True if user wants to scaffold, false otherwise
 */
const promptScaffold = async (day: number): Promise<boolean> => {
	const { scaffold } = await inquirer.prompt<{ scaffold: boolean }>([
		{
			type: "confirm",
			name: "scaffold",
			message: `Day ${day} does not exist. Would you like to scaffold it?`,
			default: true,
		},
	]);
	return scaffold;
};
