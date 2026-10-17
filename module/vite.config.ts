import { RedBullVitePlugin } from "@rb-cep/custom-script/vite";
import react from "@vitejs/plugin-react";
import { type ConfigEnv, defineConfig } from "vite";
import projectConfig from "./frontend/redbull.config";

export default defineConfig((config: ConfigEnv) => {
	return {
		root: "./frontend",
		plugins: [
			RedBullVitePlugin(config, { panelType: "ExtensionModule", extensionModuleConfig: projectConfig }),
			react(),
		],
	};
});
