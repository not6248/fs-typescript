import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      throw new Error('malformatted parameters');
    }

    const categoryMessage: string = calculateBmi(Number(height), Number(weight));

    res.json(
      {
        weight: weight,
        height: height,
        bmi: categoryMessage
      });

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target)
    return res.send({ error: "parameters missing" });
  
  if(!Array.isArray(daily_exercises))
    return res.send({ error: "malformatted parameters" });

  for (let idx = 0; idx < daily_exercises.length; idx++) {
    if (isNaN(Number(daily_exercises[idx])))
      return res.send({ error: "malformatted parameters" });
  }

  return res.json(calculateExercises(daily_exercises as [], Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});