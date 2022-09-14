import { Router } from "express";
import { AuthenticationdMiddleware } from "../middlewares/AuthenticationdMiddleware.js";
import itemsController from "../controllers/itemsController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import itemsSchema from "../schemas/itemsSchema.js";
const itemsRouter = Router();

itemsRouter.get(
	"/items/workspace",
	AuthenticationdMiddleware,
	itemsController.GetWorkSpace
);
itemsRouter.post(
	"/items/workspace",
	validateSchemaMiddleware(itemsSchema.createItemSchema),
	AuthenticationdMiddleware,
	itemsController.InsertNewItem
);
itemsRouter.post(
	"/supervisor/items",
	validateSchemaMiddleware(itemsSchema.createItemBySupervisorSchema),
	AuthenticationdMiddleware,
	itemsController.InsertNewItemBySupervisor
);
itemsRouter.patch(
	"/items/workspace/status/:id",
	validateSchemaMiddleware(itemsSchema.updateStatusSchema),
	AuthenticationdMiddleware,
	itemsController.UpdateStatus
);
itemsRouter.patch(
	"/items/workspace/:id/:elapsedTime",
	AuthenticationdMiddleware,
	itemsController.UpdateElapsedTime
);

itemsRouter.get(
	"/items/search/:os",
	AuthenticationdMiddleware,
	itemsController.SearchByOs
);
itemsRouter.get(
	"/items/finished",
	AuthenticationdMiddleware,
	itemsController.GetAllFinished
);
itemsRouter.get(
	"/items/overview/day",
	AuthenticationdMiddleware,
	itemsController.getOverviewDay
);
export default itemsRouter;
