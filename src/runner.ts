import chalk from "chalk";
const { gray, yellow } = chalk;
import { createSpinner } from "nanospinner";

export type Part = (input: string) => number;
export type Day = Record<1 | 2, Part>;

/**
 * Dynamically import a day's implementation
 * @param day Day number (e.g., 1, 2, 3, etc.)
 * @returns Promise with Day implementation
 */
export const importDay = async (day: number): Promise<Day> => {
  const dayStr = day.toString().padStart(2, "0");
  return (await import(`./days/${dayStr}.ts`)).default;
};

/**
 * Execute a specific day and part of Advent of Code
 * @param title Title of the Part (e.g., "Part 1")
 * @param part Function implementing the puzzle solution
 * @param input Puzzle input as a string
 * @returns Promise with puzzle answer as number
 */
export const executePart = async (title: string, part: Part, input: string): Promise<number> => {
  const spinner = createSpinner(title).start();
  const startTime = performance.now();
  try {
    const answer = part(input);
    const endTime = performance.now();
    const microseconds = ((endTime - startTime) * 1000).toFixed(0);
    const text = `${title}: ${yellow(answer)} ${gray(`Completed in ${microseconds}µs`)}`;
    spinner.success({ text });
    return answer;
  } catch (error) {
    const endTime = performance.now();
    const microseconds = ((endTime - startTime) * 1000).toFixed(0);
    const errorText = error instanceof Error ? error.message : String(error);
    const text = `${title} ${gray(`Failed after ${microseconds}µs\n${errorText}`)}`;
    spinner.error({ text });
    process.exit(1);
  }
};
