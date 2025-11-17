import type { Day } from "../runner.ts";

export default {
	1: (input) => {
		return input.length;
	},
	2: (input) => {
		return input.length * 2;
	},
} satisfies Day;
