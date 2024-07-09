// src/index.js
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

function verifyToken(req: Request, res: Response, next: NextFunction) {
	const token: string | undefined = process.env.TOKEN;
	assert(token != undefined);
	if (getAuthKey(req) !== token) {
		throw new Error("Invalid token");
	}
	next();
}

function getAuthKey(req: Request): string | undefined {
	const authField = req.headers.authorization;
	if (!authField) {
		return undefined;
	}
	const key = authField.split(" ")[1];
	return key;
}

app.use(verifyToken);

app.get("/", (req: Request, res: Response) => {
	console.log(req.body);
	res.send("Personal Notion API");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
