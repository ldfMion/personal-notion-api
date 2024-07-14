import dotenv from "dotenv";
import { Router, Request, Response } from "express";
import assert from "assert";
import addPageToDatabase, {
	PageProperties,
} from "../../../helpers/addPageToDatabase";
import parseTaskPrompt from "./parseTaskPrompt";
import getPrompt from "../../../helpers/getPrompt";

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
