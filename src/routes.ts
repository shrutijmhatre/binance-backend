import express from "express";
import { getAccountPrivateKeys, getBalanceForTokens, performMarketSpotTrade, performMarketLimitTrade , performDCA} from "./controller";
import { validate } from "./validationMiddleware";
import { createMarketSpotTradeSchema, createMarketLimitTradeSchema, createDCASchema } from "./schemas";

const routes = express.Router();

routes.get("/privatekey/:id", getAccountPrivateKeys);

routes.get("/balance/:id", getBalanceForTokens);

routes.post("/spotTrade", validate(createMarketSpotTradeSchema), performMarketSpotTrade)

routes.post("/limitTrade", validate(createMarketLimitTradeSchema), performMarketLimitTrade)

routes.post("/dca", validate(createDCASchema), performDCA);

export default routes;