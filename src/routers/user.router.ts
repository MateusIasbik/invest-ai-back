import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import { userController } from "../controllers/user-controller";
import { createUserDataSchema } from "../schemas/assets-schema";

const userRouter = Router();

userRouter.post("/", validateSchema(createUserDataSchema), userController.updateUser);
userRouter.get("/:frontId", userController.findByFrontId);

export default userRouter;