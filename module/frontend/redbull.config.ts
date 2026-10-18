import type { ExtensionModuleFeatures, ProjectConfig, ProjectPreviewConfig } from "@rb-cep/custom-script/config";

const projectConfig = [
	{
		entrypoint: "extension-module-1.js",
		features: [{ name: "rbAccount" }],
	},
	{
		entrypoint: "extension-module-1.js",
		features: [{ name: "rbAccount" }],
	},
] satisfies ProjectConfig;

export type ModuleOneFeatures = ExtensionModuleFeatures<typeof projectConfig, 0>;
export default projectConfig;

export const projectPreviewConfig = {
	url: "https://staging-preview.redbull.com/pl-ay/esm/local/3000/test",
	panels: {
		"a4985354-0230-4100-a7c3-974bd2160dc4": projectConfig[0].entrypoint,
		"e3888453-348d-4b53-91de-30430135fdaf": projectConfig[1].entrypoint,
	},
} satisfies ProjectPreviewConfig<typeof projectConfig>;
