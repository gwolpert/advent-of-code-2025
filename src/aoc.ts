import chalk from "chalk";
const { red } = chalk;
import * as cheerio from "cheerio";
import { loadConfig } from "./config";

/**
 * Fetch the title of the given day from Advent of Code website
 * @param day Day number (1-25)
 * @returns Title of the day or fallback title
 */
export const fetchDayTitle = async (day: number): Promise<string> => {
	const fallbackTitle = `Day ${day}`;
	try {
		const { baseUrl, year } = await loadConfig();
		const url = `${baseUrl}/${year}/day/${day}`;
		const response = await fetch(url);

		if (!response.ok) return fallbackTitle;

		const html = await response.text();
		const find = cheerio.load(html);

		const h2Text = find("article.day-desc>h2").first().text();
		const title = h2Text.replace(/-/g, "").trim();

		return title || fallbackTitle;
	} catch (error) {
		console.error(red(`Failed to fetch day title: ${error}`));
		return fallbackTitle;
	}
};

/**
 * Fetch the puzzle input for the given day from Advent of Code website
 * @param day Day number (1-25)
 * @returns Puzzle input as a string
 */
export const fetchInput = async (day: number): Promise<string> => {
	const { baseUrl, year, session } = await loadConfig();
	const url = `${baseUrl}/${year}/day/${day}/input`;
	const request: RequestInit = { headers: { cookie: `session=${session}` } };
	const response = await fetch(url, request);

	if (!response.ok) {
		console.error(red(`Failed to fetch input: ${response.statusText}`));
		process.exit(1);
	}

	const input = await response.text();
	return input.trim();
};
