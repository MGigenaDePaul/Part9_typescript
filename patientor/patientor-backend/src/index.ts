import express from 'express';
import cors from 'cors';
import diagnoses from '../data/diagnoses';
import patients from '../data/patients';

const app = express();
app.use(cors());

app.use(express.json());  

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnoses);
});

app.get('/api/patients', (_req, res) => {
  res.send(patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    })));
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});