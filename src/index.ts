import * as dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import express from 'express';
import moviesRouter from './routes/movies';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use('/', moviesRouter);

app.listen(3000, () => {
  console.log('Server running!');
});

export default app;
