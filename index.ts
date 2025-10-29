import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    // if weight and height are not numbers return error
    if (!Number(req.query.weight) || !Number(req.query.height)) {
      res.status(400).send({error: 'malformatted parameters'})
      throw new Error('malformatted parameters')
    }
  
    res.send({
      weight: req.query.weight,
      height: req.query.height,
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    })  
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});