import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${1}`, async () => {
	const input = "";
	const day = await importDay(1);

	test("Part 1", async () => {
		const part = day[1];
		const result = await executePart("Part 1", part, input);
		expect(result).toBe(0);
	});

	test("Part 2", async () => {
		const part = day[2];
		const result = await executePart("Part 2", part, input);
		expect(result).toBe(0);
	});
});
