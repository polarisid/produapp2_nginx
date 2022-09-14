import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";

import userSchema from "../schemas/userSchema.js";

const userRouter = Router();
userRouter.post(
	"/signup",
	validateSchemaMiddleware(userSchema.userRegisterSchema),
	userController.SignUp
);
userRouter.post(
	"/signin",
	validateSchemaMiddleware(userSchema.userLoginSchema),
	userController.SignIn
);

export default userRouter;
