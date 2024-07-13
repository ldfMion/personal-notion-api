import assert from "assert";
import { Router, Request, Response } from "express";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import { NotionDBFetcher } from "../../../../notion-db-fetcher";

dotenv.config();

const router = Router();
const dbId = process.env.TASK_DATABASE_ID;
const authToken = process.env.NOTION_AUTH_TOKEN;
const notionClient = new Client({ auth: authToken });

async function getTodaysTasks(limit: number): Promise<Task[]> {
	assert(authToken != undefined);
	assert(dbId != undefined);
	const mapping = {
		taskName: "Name",
		tags: "Tags",
	};
	const dbFetcher = new NotionDBFetcher<Task>(dbId, notionClient, mapping);
	const tasks: Task[] = await dbFetcher.get({
		...filtersAndSorts,
		pageSize: limit,
	});
	return tasks;
}

const DEFAULT_LIMIT = 10;

router.get("/", async (req: Request, res: Response) => {
	try {
		const limit = getLimit(req) || DEFAULT_LIMIT;
		const tasks = await getTodaysTasks(limit);
		res.send(tasks);
	} catch (error) {
		res.status(400).send((error as Error).toString());
		return;
	}
});

function getLimit(req: Request): number | undefined {
	if (req.body == undefined || req.body.limit == undefined) {
		return undefined;
	}
	const limitValue = req.body.limit;
	if (isNaN(limitValue)) {
		throw new Error("Limit must be a number");
	}
	const limit = parseInt(limitValue);
	if (limit <= 0) {
		throw new Error("Limit must be greater than 0");
	}
	return limit;
}

interface Task {
	taskName: string;
	tags: string[];
}

const filtersAndSorts = {
	filter: {
		and: [
			{
				property: "Today view",
				checkbox: {
					equals: true,
				},
			},
			{
				property: "Done formula",
				checkbox: {
					does_not_equal: true,
				},
			},
			{
				property: "Scope",
				select: {
					equals: "Task",
				},
			},
		],
	},
	sorts: [
		{
			property: "Priority",
			direction: "ascending",
		},
	],
};

export default router;
