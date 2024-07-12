// src/index.js
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import verifyToken from "./auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use("/", verifyToken);

app.get("/", (req: Request, res: Response) => {
	console.log(req.body);
	res.send("Personal Notion API");
});

app.get("/today", (req: Request, res: Response) => {
	res.send(["clean the dishes", "read 10 pages"]);
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
