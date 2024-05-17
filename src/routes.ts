import express from "express";
import { getAccountPrivateKeys, getBalanceForTokens, performMarketSpotTrade, performMarketLimitTrade , performDCA} from "./controller";
import { validate } from "./validationMiddleware";
import { createMarketSpotTradeSchema, createMarketLimitTradeSchema, createDCASchema } from "./schemas";

const routes = express.Router();

/**
 * @swagger
 * /privatekey/{id}:
 *   get:
 *     summary: Get private keys of accound by uid
 *     tags: [Demo]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             {}
 *       404:
 *         description: Account not found
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Account with id not found"
 */
//Get Private Key of Account By Id
routes.get("/privatekey/:id", getAccountPrivateKeys);

/**
 * @swagger
 * /balance/{id}:
 *   get:
 *     summary: Get balance of accound by uid and tokens 
 *     tags: [Demo]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         description: Token for which to check balance - can specify multiple tokens eg- token=USDT&token=ETH
 *         example:
 *             USDT
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             {}
 *       400:
 *         description: tokens not provided
 *         content:
 *          application/json:
 *            example:
 *              message: "Tokens not specified in query string"
 */
//Get balances of Account By Id and tokens
routes.get("/balance/:id", getBalanceForTokens);

/**
 * @swagger
 * /spotTrade:
 *   post:
 *     summary: Create a new spot market trade
 *     tags: [Demo]
 *     requestBody:
 *       description: Spot market trade creation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               tokenIn:
 *                 type: string
 *               tokenOut:
 *                 type: string
 *               side:
 *                 type: string
 *               amountIn:
 *                 type: integer
 *             example:
 *                uid: "1"
 *                tokenIn: "USDT"
 *                tokenOut: "ETH"
 *                side: "BUY"
 *                amountIn: 1
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Invalid request
 */
// Create Spot Market Trade
routes.post("/spotTrade", validate(createMarketSpotTradeSchema), performMarketSpotTrade)

/**
 * @swagger
 * /limitTrade:
 *   post:
 *     summary: Create a new spot limit trade
 *     tags: [Demo]
 *     requestBody:
 *       description: Spot limit trade creation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               tokenIn:
 *                 type: string
 *               tokenOut:
 *                 type: string
 *               side:
 *                 type: string
 *               amountIn:
 *                 type: integer
 *               limitPrice: 
 *                  type:integer
 *             example:
 *                uid: "1"
 *                tokenIn: "USDT"
 *                tokenOut: "ETH"
 *                side: "BUY"
 *                amountIn: 1
 *                limitPrice: 2000
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Invalid request
 */
// Create Spot Limit Trade
routes.post("/limitTrade", validate(createMarketLimitTradeSchema), performMarketLimitTrade)

/**
 * @swagger
 * /dca:
 *   post:
 *     summary: Create a DCA
 *     tags: [Demo]
 *     requestBody:
 *       description: DCA creation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               tokenIn:
 *                 type: string
 *               tokenOut:
 *                 type: string
 *               side:
 *                 type: string
 *               amountIn:
 *                 type: integer
 *               intervalInSeconds:
 *                  type: integer
 *             example:
 *                uid: "1"
 *                tokenIn: "USDT"
 *                tokenOut: "ETH"
 *                side: "BUY"
 *                amountIn: 1
 *                intervalInSeconds: 10
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Invalid request
 */
// Create DCA
routes.post("/dca", validate(createDCASchema), performDCA);

export default routes;