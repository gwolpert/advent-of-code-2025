import { join } from "path";

export type Config = {
	year: number;
	baseUrl: string;
	session: string;
};

/**
 * Load configuration from config.yaml
 * @returns Parsed configuration object
 */
export const loadConfig = async (): Promise<Config> => {
	const configPath = join(import.meta.dir, "..", "config.yaml");
	const text = await Bun.file(configPath).text();
	return Bun.YAML.parse(text) as Config;
};
