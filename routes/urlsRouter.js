import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { shortUrlMiddleware, urlIdMiddleware, urlMiddleware, userUrlMiddleware } from "../middlewares/urlsMiddleware.js";
import { postUrl, getUrlId, getShortUrl, deleteUrl } from "../controllers/urlsController.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', urlMiddleware, tokenValidation, postUrl);
urlRouter.get('/urls/:id', urlIdMiddleware, getUrlId);
urlRouter.get('/urls/open/:shortUrl', shortUrlMiddleware, getShortUrl);
urlRouter.delete('/urls/:id', tokenValidation, urlIdMiddleware, userUrlMiddleware, deleteUrl);

export default urlRouter;