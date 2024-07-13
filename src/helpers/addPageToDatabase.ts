import { Client, isFullPage } from "@notionhq/client";
import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import assert from "assert";

export type PageProperties = Record<string, any>;

const authToken = process.env.NOTION_AUTH_TOKEN;
assert(authToken != undefined);
const notion = new Client({ auth: authToken });

export default async function addPageToDatabase(
	databaseId: string,
	properties: PageProperties
): Promise<string> {
	const response: CreatePageResponse = await notion.pages.create({
		parent: {
			database_id: databaseId,
		},
		properties: properties,
		children: [],
	});
	if (!isFullPage(response)) {
		console.log(response);
		throw Error("Error creating page");
	}
	return response.url;
}
