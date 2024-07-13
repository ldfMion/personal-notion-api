import dotenv from "dotenv";
import { Router, Request, Response } from "express";
import assert from "assert";
import addPageToDatabase, {
	PageProperties,
} from "../../../helpers/addPageToDatabase";
import parseTaskPrompt from "./parseTagPrompt";

dotenv.config();

const router = Router();
const dbId = process.env.TASK_DATABASE_ID;

router.post("/", async (req: Request, res: Response) => {
	const prompt = getPrompt(req);
	if (prompt == undefined) {
		return res.status(400).send("No prompt provided");
	}
	try {
		const { name, url } = await addTaskToNotion(prompt);
		res.send(url);
	} catch (error) {
		res.status(400).send((error as Error).toString());
		return;
	}
});

function getPrompt(req: Request): string | undefined {
	if (req.body == undefined || req.body.prompt == undefined) {
		return undefined;
	}
	return req.body.prompt;
}

async function addTaskToNotion(
	prompt: string
): Promise<{ name: string; url: string }> {
	const properties = parseTaskPrompt(prompt);
	assert(dbId != undefined);
	const url = await addPageToDatabase(dbId, properties);
	return {
		name: "No implemented yet",
		url: url,
	};
}

export default router;
