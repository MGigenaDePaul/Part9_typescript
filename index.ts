import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.use(express.json());

app.get('/bmi', (req, res) => {
    // if weight and height are not numbers return error
    if (!Number(req.query.weight) || !Number(req.query.height)) {
      res.status(400).send({error: 'malformatted parameters'});
      throw new Error('malformatted parameters');
    }
  
    res.send({
      weight: req.query.weight,
      height: req.query.height,
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({error: 'parameters missing'});
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))){
    return res.status(400).send({error: 'malformatted parameters'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, Number(target), );
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});