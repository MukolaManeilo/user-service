import express, { Request, Response } from 'express';

const app = express();
const PORT = 5000;

app.get('/',(req: Request, res: Response) => {
    console.log('Its ok');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});