import { CosmosButton, CosmosPersonCard, CosmosText } from "@cosmos/web-react";
import { useState } from "react";

// @See Stored Queries: https://engineering.redbull.com/cds/stored-queries
// @See Proxyless GraphQL: https://engineering.redbull.com/cds/proxyless-graphql-experimental
const STORED_QUERY_ID_FETCH_PERSON_PROFILE = "rrn:gql-queries:2dc1969d-ad97-544b-b621-7f362396a110";

export function CrepoExample() {
	const [loading, setLoading] = useState(false);
	const [profile, setProfile] = useState<{
		givenName: string;
		familyName: string;
		featuredMedia?: [{ imageSrc: string }];
	} | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Direct via stored query (public key, frontend)
	async function fetchDirectViaStoredQuery() {
		setLoading(true);
		setError(null);
		setProfile(null);

		try {
			const response = await fetch(`${import.meta.env.VITE_CREPO_ENDPOINT}/${STORED_QUERY_ID_FETCH_PERSON_PROFILE}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"api-key": import.meta.env.VITE_FRONTEND_CREPO_PUBLIC_API_KEY,
				},
			});

			const json = await response.json();
			const resource = json.data?.resource ?? null;
			setProfile(resource);

			if (!resource) {
				setError("No data returned");
			}
		} catch (e) {
			setError(e instanceof Error ? e.message : "Unknown error");
		}

		setLoading(false);
	}

	return (
		<div className="crepo-example">
			<CosmosText tag="h3" weight="bold">
				GraphQL API Example
			</CosmosText>
			<CosmosButton kind="primary" size="small" disabled={loading} onClick={fetchDirectViaStoredQuery}>
				{loading ? "Loading..." : "Fetch Direct (Stored Query)"}
			</CosmosButton>
			{profile && (
				<div className="crepo-result">
					<CosmosPersonCard
						cover
						image={profile.featuredMedia?.[0]?.imageSrc}
						profileImage={profile.featuredMedia?.[0]?.imageSrc}
						name={`${profile.givenName} ${profile.familyName}`}
					/>
				</div>
			)}
			{error && (
				<div className="crepo-result">
					<CosmosText>Error: {error}</CosmosText>
				</div>
			)}
		</div>
	);
}
