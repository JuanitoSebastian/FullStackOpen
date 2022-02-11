import express from 'express';
import { PORT } from './utils/config';
import cors from 'cors';
import diagnosesRoute from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnosesRoute);
app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🛰`);
});