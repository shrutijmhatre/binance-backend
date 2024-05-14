
import express, { Request, Response } from 'express';
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Binance demo apis are running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});