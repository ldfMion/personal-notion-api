import { Request } from "express";
export default function getPrompt(req: Request): string | undefined {
	if (req.body == undefined || req.body.prompt == undefined) {
		return undefined;
	}
	return req.body.prompt;
}
