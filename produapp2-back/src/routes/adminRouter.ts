import { Router } from "express";
import { AuthenticationdMiddleware } from "../middlewares/AuthenticationdMiddleware.js";
import itemsSchema from "../schemas/itemsSchema.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import adminController from "../controllers/adminController.js";
import userSchema from "../schemas/userSchema.js";
("../schemas/userSchema.js");
const adminRouter = Router();

adminRouter.get(
  "/admin/items/workspace/:asc",
  AuthenticationdMiddleware,
  adminController.GetDasboard
);

adminRouter.get(
  "/admin/items/report/:asc",
  AuthenticationdMiddleware,
  adminController.GetReport
);
adminRouter.get(
  "/admin/users/:asc",
  // AuthenticationdMiddleware,
  adminController.GetUsersFromGroup
);
adminRouter.post(
  "/admin/create",
  validateSchemaMiddleware(userSchema.adminRegisterSchema),
  adminController.CreateAdminUser
);

export default adminRouter;
