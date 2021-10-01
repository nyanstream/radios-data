import { readFileSync } from "fs";
import { writeFile } from "fs/promises";

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { EOL } from "os";

import { load as loadYAML } from "js-yaml";

import Ajv from "ajv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_FILE = resolve(__dirname, "data-source.yaml");
const OUTPUT_FILE = resolve(__dirname, "data.json");

const ajv = new Ajv();

const SourceData = loadYAML(readFileSync(SOURCE_FILE, "utf8"));

const SourceDataScheme = {
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

const validate = ajv.compile(SourceDataScheme);

const valid = validate(SourceData);

if (valid) {
	await writeFile(OUTPUT_FILE, JSON.stringify(SourceData) + EOL, {
		encoding: "utf8",
	});
} else {
	console.warn("Invalid scheme!");
	console.warn(validate.errors);
}
