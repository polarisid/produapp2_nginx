import { Router } from "express";
import userRouter from "./userRouter.js";
import itemsRouter from "./itemsRouter.js";
import adminRouter from "./adminRouter.js";
const router = Router();
router.use(userRouter);
router.use(itemsRouter);
router.use(adminRouter);

export default router;
