// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import verifyToken from "./auth";
import todayRoute from "./routes/tasks/today";
import newTaskRoute from "./routes/tasks/new";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use("/tasks/today", todayRoute);
app.use("/tasks/new", newTaskRoute);

const port = process.env.PORT || 4000;

app.use("/", verifyToken);

app.get("/", (req: Request, res: Response) => {
	res.send("Personal Notion API");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
