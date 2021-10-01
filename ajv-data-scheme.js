export const SCHEME = {
	type: "object",
	patternProperties: {
		"^[a-z][a-z0-9\\-]*$": {
			type: "object",
			properties: {
				title: {
					type: "string",
				},
				lang: {
					type: "string",
				},
				websiteURL: {
					type: "string",
				},
				streamEndpointURL: {
					type: "string",
				},
				apiEndpointURL: {
					type: "string",
				},
				apiContentResponseType: {
					type: "string",
				},
			},
			required: [
				"title",
				"lang",
				"websiteURL",
				"streamEndpointURL",
				"apiEndpointURL",
			],
			additionalProperties: false,
		},
	},
};
