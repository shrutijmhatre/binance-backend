
import express, { Request, Response } from 'express';
import "dotenv/config";
import routes from './routes';
import { errorHandler } from './errorHandlerMiddleware';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Binance demo apis are running!');
});

app.use("/api", routes);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});