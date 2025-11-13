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
		const config = await loadConfig();
		const url = `${config.baseUrl}/${config.year}/day/${day}`;
		const response = await fetch(url);

		if (!response.ok) return fallbackTitle;

		const html = await response.text();
		const $ = cheerio.load(html);

		const h2Text = $("article.day-desc>h2").first().text();
		const title = h2Text.replace(/-/g, "").trim();

		return title || fallbackTitle;
	} catch (error) {
		console.error(red(`Failed to fetch day title: ${error}`));
		return fallbackTitle;
	}
};
