import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userServices from "../services/userServices.js";
import { unauthorizedError } from "../utils/errorUtils.js";
dotenv.config();

export async function AuthenticationdMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authorization = req.headers["authorization"];
	if (!authorization) throw unauthorizedError("Missing authorization header");

	const token = authorization.replace("Bearer ", "");
	if (!token) throw unauthorizedError("Missing token");

	try {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
			userId: number;
		};
		const user = await userServices.findById(userId);
		res.locals = { ...res.locals, user };

		next();
	} catch {
		throw unauthorizedError("Invalid token");
	}
}
