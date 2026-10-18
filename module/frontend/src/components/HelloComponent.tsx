import { CosmosButton, CosmosDefaultCard } from "@cosmos/web-react";
import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import rbLogo from "../assets/rb.svg";
import reactLogo from "../assets/react.svg";
import { useRbAccount } from "../context/rb-account";

export function HelloComponent() {
	const [count, setCount] = useState(0);
	const { getUserProfile, loginWithRedirect } = useRbAccount();
	const [user, setUser] = useState<Awaited<ReturnType<typeof getUserProfile>> | null>(null);

	useEffect(() => {
		getUserProfile().then(setUser);
	}, [getUserProfile]);

	return (
		<div className="hello-component">
			<div
				style={{
					display: "flex",
					gap: "2rem",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<a href="https://engineering.redbull.com/custom-development" target="_blank" rel="noreferrer">
					<img src={rbLogo} className="logo rb" alt="redbull logo" />
				</a>
				<a href="https://vite.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
			</div>
			<h1>Custom Script powered by Vite + React</h1>
			<CosmosDefaultCard
				style={{ width: "400px" }}
				headline="React Custom Script"
				image={reactLogo}
				metaText="src/react/components/HelloComponent.tsx"
				text="Edit this component to test HMR"
				logo={reactLogo}
			/>

			<CosmosButton id="counter" kind="primary" size="small" onClick={() => setCount((count) => count + 1)}>
				Engagement Builder — built live 1792310384
			</CosmosButton>
			{user ? (
				<div>
					{user.firstName} {user.lastName}
				</div>
			) : (
				<CosmosButton kind="secondary" size="small" onClick={() => loginWithRedirect()}>
					Login
				</CosmosButton>
			)}
		</div>
	);
}
