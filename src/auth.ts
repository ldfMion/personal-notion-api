import assert from "assert";
import { Request, Response, NextFunction, RequestHandler } from "express";

const verifyToken: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token: string | undefined = process.env.TOKEN;
	assert(token != undefined);
	if (getAuthKey(req) !== token) {
		throw new Error("Invalid token");
	}
	next();
};

function getAuthKey(req: Request): string | undefined {
	const authorization = req.get("authorization");
	if (!authorization) {
		throw new Error("Authorization field not in header.");
	}
	const key = authorization.split(" ")[1];
	return key;
}

export default verifyToken;
