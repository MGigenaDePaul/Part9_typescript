import express from 'express';
import { newEntrySchema } from '../utils';
import { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import z from 'zod';
import { NewPatientEntry, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
}; 

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;