
import express, { Request, Response } from 'express';
import "dotenv/config";
import routes from './routes';
import { errorHandler } from './errorHandlerMiddleware';

import swaggerJsDoc from "swagger-jsdoc";
import * as swaggerUI from "swagger-ui-express";

const app = express();
const port = process.env.PORT;

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Binance coding assignment",
			version: "1.0.0",
			description: "Binance coding assignment - APIs to demonstrate functionalities required for the assignment",
		},
		servers: [
			{
				url: `http://localhost:${port}/api`
			},
		],
	},
	apis: ["./src/routes.ts"],
};

const specs = swaggerJsDoc(options);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Binance demo apis are running!');
});

app.use("/api", routes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});