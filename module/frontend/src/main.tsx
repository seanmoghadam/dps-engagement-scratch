import type { ExtensionModuleExports } from "@rb-cep/custom-script/types";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { ModuleOneFeatures } from "../redbull.config";
import { App } from "./App";
import { RbAccountContext } from "./context/rb-account";

export const extensionModule: ExtensionModuleExports<{}, ModuleOneFeatures> = {
	render: async ({ el, config, api }) => {
		const rbAccount = await api.rbAccount.init();
		createRoot(el).render(
			<StrictMode>
				<RbAccountContext value={rbAccount.account}>
					<App />
				</RbAccountContext>
			</StrictMode>
		);
	},
};
