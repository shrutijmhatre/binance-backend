#Files

Create a .env file with below variables to test in Testnet environment of Binance

```sh
PORT=5000
BINANCE_BASE_URL='https://testnet.binance.vision'
```
Note: replace BINANCE_BASE_URL value with "https://api.binance.com" for mainnet environment

In "constant.ts" file replace the values for private keys
eg:
```sh
[
{ 
    uid: "1",
    key: "API-KEY",
    secret: "API-SECRET",
},
]
```

#Installation
Install the dependencies and devDependencies and start the server.

```sh
npm i
npm start
```
The project should run on (http://localhost:5000) once all the dependencies are installed and the servers starts successfully.

#Documentation
Refer the swagger documentation in order to understand how to test the functions using API endpoints

Swagger url - (http://localhost:5000/api-docs)

