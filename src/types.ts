import { Side } from "@binance/connector-typescript";

export interface accountPrivateKeys {
    uid: number;
    key: string;
    secret: string;
}

export interface spotTradeInput {
    uid:string;
    tokenIn:string; 
    tokenOut:string;
    side: Side;
    amountIn: number;
}

export interface limitTradeInput extends spotTradeInput  {
    limitPrice : number;
}

export interface DCAInput extends spotTradeInput {
    intervalInSeconds : number
}