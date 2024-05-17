import { z } from "zod";

export const createMarketSpotTradeSchema = z.object({
    uid: z.string({message: "uid is required"}),
    tokenIn: z.string({message: "tokenIn is required"}), 
    tokenOut: z.string({message: "tokenOut is required"}),
    side: z.string({message: "side is required"}),
    amountIn: z.number({message: "amountIn is required"}),
})

export const createMarketLimitTradeSchema = z.object({
    uid: z.string({message: "uid is required"}),
    tokenIn: z.string({message: "tokenIn is required"}), 
    tokenOut: z.string({message: "tokenOut is required"}),
    side: z.string({message: "side is required"}),
    amountIn: z.number({message: "amountIn is required"}),
    linitPrice: z.number({message: "limitPrice is required"}),
});

export const createDCASchema = z.object({
    uid: z.string({message: "uid is required"}),
    tokenIn: z.string({message: "tokenIn is required"}), 
    tokenOut: z.string({message: "tokenOut is required"}),
    side: z.string({message: "side is required"}),
    amountIn: z.number({message: "amountIn is required"}),
    intervalInSeconds: z.number({message: "intervalInSeconds is required"}),
});

