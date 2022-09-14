import { Request, Response } from "express";
import userService from "../services/userServices.js";
import { UserRegisterType, UserLoginType } from "../types/userTypes.js";

async function SignUp(req: Request, res: Response) {
	const user = {
		...res.locals,
		email: res.locals.email.toLowerCase(),
		name: res.locals.name.toLowerCase(),
		ascCode: res.locals.ascCode.toString(),
	} as UserRegisterType;
	await userService.createAndVerifyNewUser(user);
	res.status(201).send("User created");
}

async function SignIn(req: Request, res: Response) {
	const user = {
		...res.locals,
		email: res.locals.email.toLowerCase(),
	} as UserLoginType;
	const token = await userService.authenticateUser(user);
	res.status(200).send({ token });
}

export default { SignUp, SignIn };
