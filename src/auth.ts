import assert from "assert";
import { Request, Response, NextFunction, RequestHandler } from "express";

const verifyToken: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token: string | undefined = process.env.TOKEN;
	assert(token != undefined);
	const key = getAuthKey(req);
	if (key == undefined) {
		res.status(401).send("No token provided");
	} else if (getAuthKey(req) !== token) {
		res.status(403).send("Invalid token");
	}
	next();
};

function getAuthKey(req: Request): string | undefined {
	const authorization = req.get("authorization");
	if (!authorization) {
		return undefined;
	}
	const key = authorization.split(" ")[1];
	return key;
}

export default verifyToken;
