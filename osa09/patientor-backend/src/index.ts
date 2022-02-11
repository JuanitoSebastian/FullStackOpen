import express from 'express';
import { PORT } from './utils/config';
import cors from 'cors';
import diagnosesRoute from './routes/diagnoses';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnosesRoute);

app.get('/api/ping', (_request, response) => {
  console.log('ping was received');
  response.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🛰`);
});