import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { usersMiddleware } from "../middlewares/usersMiddleware.js";
import { getUsers } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get('/users/:id', tokenValidation, usersMiddleware, getUsers);

export default usersRouter;