import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { AccountApi } from "@rb-cep/custom-script/types";
import { App } from "./src/App";
import { RbAccountContext } from "./src/context/rb-account";

/**
 * Standalone dev-preview harness for the EMP extension module.
 * The production mount is the EMP host (staging chrome); this page mounts the
 * same <App /> tree without the host so design iteration (impeccable live)
 * can select and variant-test the module's own DOM, same-origin.
 */
const host = document.getElementById("mount");

// The RB dev middleware appends a client redirect to the canonical bundle URL
// after this entry. Adopt that path before it runs so the check no-ops and the
// harness stays mounted (same-origin history mutation only).
const canonical = "/pl-ay/local/3000/bundle.js";
if (window.location.pathname !== canonical) history.replaceState(null, "", canonical);
if (!host) throw new Error("preview harness mount node missing");

// Trusted boundary: the real host builds this inside api.rbAccount.init();
// the harness provides only the calls module code makes at boot.
const harnessAccount = {
	getUserProfile: async () => ({ firstName: "Dev" }),
	isLoggedIn: () => true,
	loginWithRedirect: async () => {},
	logout: async () => {},
} as unknown as AccountApi;

createRoot(host).render(
	<StrictMode>
		<RbAccountContext value={harnessAccount}>
			<App />
		</RbAccountContext>
	</StrictMode>,
);
