import express from 'express';
import calculateBmi from './bmiCalculator.ts';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
  const { height, weight } = req.query;

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      throw new Error('malformatted parameters');
    }

    const categoryMessage: string = calculateBmi(Number(height), Number(weight))
    
    res.json(
      {
        weight: weight,
        height: height,
        bmi: categoryMessage
      });

    } catch (error: unknown) {
      if (error instanceof Error) {
        res.json(
          {
            error: error.message
          });
      }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});