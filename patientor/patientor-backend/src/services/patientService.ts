import patients from '../../data/patients';
import { NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const addPatient = (entry: NewPatientEntry): Patient => {
   const newDiaryEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };

  patients.concat(newDiaryEntry);
  return newDiaryEntry;
};

export default {
    addPatient
};