import { join } from "path";

export type Config = {
	year: number;
	baseUrl: string;
	session: string;
};

let configCache: Config | null = null;

const _loadConfig = async (): Promise<Config> => {
	const configPath = join(import.meta.dir, "..", "config.yaml");
	const text = await Bun.file(configPath).text();
	return Bun.YAML.parse(text) as Config;
};

/**
 * Load configuration from config.yaml file using memoization
 * @returns Promise with Config object
 */
export const loadConfig = async (): Promise<Config> => {
	return (configCache ??= await _loadConfig());
};
