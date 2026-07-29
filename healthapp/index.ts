import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  try {
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      throw new Error('malformatted parameters');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
  }

  const categoryMessage: string = calculateBmi(Number(height), Number(weight));
  
  return res.json(
    {
      weight: Number(weight),
      height: Number(height),
      bmi: categoryMessage
    });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    if (!daily_exercises || !target)
      throw new Error('parameters missing');

    if (isNaN(Number(target)))
      throw new Error('malformatted parameters');

    if (!Array.isArray(daily_exercises))
      throw new Error('malformatted parameters');

    for (let idx = 0; idx < daily_exercises.length; idx++) {
      if (isNaN(Number(daily_exercises[idx])))
        throw new Error('malformatted parameters');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
  }

  return res.json(calculateExercises(daily_exercises as [], Number(target)));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});