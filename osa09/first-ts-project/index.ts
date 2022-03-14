import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack! 🥰');
});

app.get('/bmi', (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return response.status(400).json({ error: 'malformatted parameters' });
  }
  
  return response.status(200).json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const body: ExerciseRequestBody = request.body;

  if (!body.daily_exercises || !body.target) {
    return response.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(body.daily_exercises) || !typeof(body.target, Number)) {
    return response.status(400).json({ error: 'malformatted parameters' });
  }
   
  const data: Array<number> = body.daily_exercises;
  const target: number = body.target;
  return response.status(200).json(calculateExercise({ data, target }));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

interface ExerciseRequestBody {
  daily_exercises: Array<number>;
  target: number;
}