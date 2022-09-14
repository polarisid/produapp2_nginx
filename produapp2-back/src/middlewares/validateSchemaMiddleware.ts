import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { sanitizeInput } from "../helpers/sanitizeInput.js";

export function validateSchemaMiddleware(schema: ObjectSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const body = sanitizeInput(req.body);
		const validation = schema.validate(body);
		if (validation.error) {
			return res.status(422).send({ error: validation.error.message });
		}
		res.locals = body;
		next();
	};
}
