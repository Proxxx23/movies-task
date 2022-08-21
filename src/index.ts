import helmet from "helmet";
import express from 'express';
import router from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use('/', router);

app.listen(3000, () => {
  console.log('Server running!');
});

export default app;
