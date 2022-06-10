import { Router } from "express";

import authRouter from "./authRouter.js";
import urlRouter from "./urlsRouter";
import usersRouter from "./usersRouter";
import rankingRouter from "./rankingRouter";

const router = Router();
router.use(authRouter);
router.use(urlRouter);
router.use(usersRouter);
router.use(rankingRouter);

export default router;