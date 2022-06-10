import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { shortUrlMiddleware, urlIdMiddleware, urlMiddleware, userUrlMiddleware } from "../middlewares/urlMiddleware.js";
import { postUrl } from "../controllers/urlController.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', urlMiddleware, tokenValidation, postUrl);

export default urlRouter;