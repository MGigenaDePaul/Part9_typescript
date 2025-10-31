import express from 'express';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    })));
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };

  res.send(patients.concat(newPatient));
});

export default router;