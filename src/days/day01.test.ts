import { default as day } from "./day01";
import { executePart } from "../runner.ts";
import { describe, test, expect } from "bun:test";

describe("Day 01", () => {
	const input = "abc";

	test("Part 1", async () => {
		const result = await executePart("Test", day[1], input);
		expect(result).toBe(3);
	});

	test("Part 2", async () => {
		const result = await executePart("Test", day[2], input);
		expect(result).toBe(2);
	});
});
