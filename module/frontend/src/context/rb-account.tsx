import type { AccountApi } from "@rb-cep/custom-script/types";
import { createContext, useContext } from "react";

export const RbAccountContext = createContext<AccountApi | undefined>(undefined);

export const useRbAccount = () => {
	const context = useContext(RbAccountContext);
	if (!context) {
		throw new Error("useRbAccount must be used within a RbAccountProvider");
	}
	return context;
};
