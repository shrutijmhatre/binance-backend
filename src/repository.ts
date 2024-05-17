
import { privateKeys} from "./constant";
import { Spot, OrderType, RestTradeTypes, Side, TimeInForce, RestMarketTypes } from '@binance/connector-typescript';

const BASE_URL = process.env.BINANCE_BASE_URL;

const getPrivatekeysFromAccounts = (uid:string) => {
        const accountInformation = privateKeys.find(acc => acc.uid === uid);
        return accountInformation;
}

const getClientFromAccountKeys = (uid:string) => {
    const privateKeys = getPrivatekeysFromAccounts(uid);
    return new Spot(privateKeys?.key, privateKeys?.secret, { baseURL: BASE_URL });
}

const getTokenBalances = async (uid:string, token: string | string[]) => {
    const client = getClientFromAccountKeys(uid);
    const accountInformation  = await client.accountInformation();
    const balances = accountInformation.balances;
    const balanceFilter = balances.filter(account =>{
        if(Array.isArray(token)){
            return token.includes(account.asset);
        } 
        if(typeof token === "string"){
            return token === account.asset;
        }
    } );
    return balanceFilter ;
}

const createMarketSpotTrade = async ( uid:string, tokenIn:string, tokenOut :string, amountIn: number, side: Side)  =>{
    const client = getClientFromAccountKeys(uid);
    
    const options: RestTradeTypes.newOrderOptions = {
        quantity: amountIn,
        recvWindow: 5000,
    };
    let trade;
    await client.newOrder( tokenIn + tokenOut, side, OrderType.MARKET, options).then((result: RestTradeTypes.newOrderResponse) => {   
        trade = result;
    });
    return trade;
}

const createMarketLimitTrade = async( uid:string, tokenIn:string, tokenOut :string, amountIn: number, limitPrice: number, side: Side) : Promise<RestTradeTypes.newOrderResponse | undefined>  =>{
    const client = getClientFromAccountKeys(uid);
    
    const options: RestTradeTypes.newOrderOptions = {
        quantity: amountIn,
        recvWindow: 5000,
        timeInForce: TimeInForce.GTC,
        price: limitPrice
    };
    let trade : RestTradeTypes.newOrderResponse | undefined;
    await client.newOrder( tokenIn + tokenOut, side, OrderType.LIMIT, options).then((result: RestTradeTypes.newOrderResponse) => {   
        trade = result;
    });
    return trade;
}

export { getPrivatekeysFromAccounts, getTokenBalances, createMarketSpotTrade, createMarketLimitTrade}