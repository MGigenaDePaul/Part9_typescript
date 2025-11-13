import express from 'express';
import { newEntrySchema, toNewEntry } from '../utils';
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

router.get('/:id/entries', (req, res) => {
  const patient = patientService.findById(String(req.params.id));
  if (patient) {
    res.send(patient.entries);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.post('/:id/entries', (req, res) => {
  const patientId = String(req.params.id);
  const patient = patientService.findById(patientId);
  if (!patient) { 
    return res.status(404).send({error: 'Patient not found' });
  };

  const newEntry = toNewEntry(req.body);
  const addedEntry = patientService.addEntry(patientId, newEntry);
  return res.json(addedEntry);
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;