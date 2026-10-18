import rbFontsPlugin from "@cep/eslint";
import { createTranslationKeysConfig } from "@rb-cep/custom-script/eslint";
import tseslint from "typescript-eslint";

export default [
	{ ignores: ["frontend/dist/**"] },
	...tseslint.configs.recommended,
	{
		rules: {
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-empty-object-type": "warn",
		},
	},
	...rbFontsPlugin.configs.recommended,
	...(await createTranslationKeysConfig()),
];
