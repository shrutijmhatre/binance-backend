import { NextFunction, Request, Response } from "express";
import "dotenv/config";

import { createMarketLimitTrade, createMarketSpotTrade, getPrivatekeysFromAccounts , getTokenBalances} from "./repository"
import { DCAInput, limitTradeInput, spotTradeInput } from "./types";

const getAccountPrivateKeys = (req:Request, res: Response, next:NextFunction) => {
    try{
        const {id} = req.params;
        const accountInformation = getPrivatekeysFromAccounts(id);
        if(accountInformation){
            res.status(200).json(accountInformation);
        }
        else{
            res.status(404).send(`Account with id: ${id} not found`);
        }
    }
    catch(error){
        next(error);
    }
}

const getBalanceForTokens = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const {id} = req.params;
        const token = req.query.token as string;
        if(token){
            const balance = await getTokenBalances(id, token);
            res.status(200).json(balance);
        } 
        else{
            res.status(400).send('Tokens not specified in query string');
        } 
    }
    catch(error){
        next(error);
    }
}

const performMarketSpotTrade = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const {uid, tokenIn, tokenOut, side, amountIn} : spotTradeInput = req.body;
        const result = await createMarketSpotTrade(uid, tokenIn, tokenOut, amountIn, side);
        res.status(201).json(result); 
   }
    catch(error){
        next(error);
   }
}

const performMarketLimitTrade = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const {uid, tokenIn, tokenOut, side, amountIn, limitPrice} : limitTradeInput = req.body;
        const result = await createMarketLimitTrade(uid, tokenIn, tokenOut, amountIn, limitPrice, side);
        res.status(201).json(result);
   }
    catch(error){
        next(error);
   }
}

const performDCA = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const {uid, tokenIn, tokenOut, side, amountIn, intervalInSeconds } : DCAInput = req.body;
        setInterval(async () => { 
            try{
                const result = await createMarketSpotTrade(uid, tokenIn, tokenOut, amountIn, side);
                res.status(201).json(result);
            }
            catch(error){
                next(error);
            }    
        }, intervalInSeconds * 1000);           
    } 
    catch (error) {
         next(error);
    }
}

export { getAccountPrivateKeys, getBalanceForTokens, performMarketSpotTrade, performMarketLimitTrade, performDCA}